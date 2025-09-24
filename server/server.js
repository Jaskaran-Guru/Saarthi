const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();

// Trust proxy for deployment
app.set('trust proxy', 1);

// Basic middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow Google OAuth redirects
}));
app.use(compression());

// CORS configuration  
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  const connectDB = require('./config/database');
  connectDB();
} else {
  console.log('⚠️  No MongoDB URI found in .env');
}

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key-for-development-only',
  resave: false,
  saveUninitialized: false,
  store: process.env.MONGODB_URI ? MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600
  }) : undefined,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// ===== MODELS =====
let User, Property, Contact;

// Only load models if MongoDB is connected
if (process.env.MONGODB_URI) {
  User = require('./models/User');
  Property = require('./models/Property');
  Contact = require('./models/Contact');
}

// ===== PASSPORT GOOGLE OAUTH WITH DATABASE =====
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('🎉 Google OAuth Success:', {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });

      // If MongoDB is not connected, return simple user object
      if (!User) {
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value || '',
          provider: 'google',
          loginTime: new Date().toISOString()
        };
        return done(null, user);
      }

      // Check if user already exists in database
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        // Update existing user
        user.lastLogin = new Date();
        user.avatar = profile.photos[0]?.value || user.avatar;
        await user.save();
        console.log('✅ Existing user logged in:', user.email);
        return done(null, user);
      } else {
        // Check if user exists with same email
        const existingUser = await User.findOne({ email: profile.emails[0].value });
        
        if (existingUser) {
          // Link Google account to existing user
          existingUser.googleId = profile.id;
          existingUser.avatar = profile.photos[0]?.value || existingUser.avatar;
          existingUser.lastLogin = new Date();
          await existingUser.save();
          console.log('✅ Linked Google account to existing user:', existingUser.email);
          return done(null, existingUser);
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value || '',
          provider: 'google',
          lastLogin: new Date()
        });

        console.log('✅ New user created in database:', user.email);
        return done(null, user);
      }
    } catch (error) {
      console.error('❌ Google OAuth Database Error:', error);
      return done(error, null);
    }
  }));

  passport.serializeUser((user, done) => {
    console.log('🔒 Serializing user:', user.email);
    // For database users, serialize with _id, for memory users, serialize entire object
    if (user._id) {
      done(null, user._id);
    } else {
      done(null, user);
    }
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // If User model exists and id is ObjectId, fetch from database
      if (User && typeof id === 'string' && id.length === 24) {
        const user = await User.findById(id);
        console.log('🔓 Deserializing user from database:', user?.email);
        done(null, user);
      } else {
        // For memory-based sessions
        console.log('🔓 Deserializing user from memory:', id.email);
        done(null, id);
      }
    } catch (error) {
      console.error('❌ Deserialize error:', error);
      done(error, null);
    }
  });

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  console.log('✅ Google OAuth with Database configured');
} else {
  console.log('⚠️  Google OAuth not configured - missing CLIENT_ID or CLIENT_SECRET');
}

// ===== ROUTES =====

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🏠 Saarthi Real Estate Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    user: req.user ? {
      name: req.user.name,
      email: req.user.email,
      loginTime: req.user.lastLogin || req.user.loginTime
    } : null,
    database: User ? '✅ Connected' : '❌ Not connected',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      properties: '/api/properties/*',
      contact: '/api/contact',
      users: '/api/users'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '✅ Saarthi Backend API is healthy!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: process.env.MONGODB_URI ? '✅ Connected' : '❌ Not configured',
    models: User ? '✅ Loaded' : '❌ Not loaded',
    session: process.env.SESSION_SECRET ? '✅ Configured' : '❌ Not configured',
    oauth: {
      google: process.env.GOOGLE_CLIENT_ID ? '✅ Configured' : '❌ Not configured'
    },
    user: req.user ? `✅ Logged in as ${req.user.name}` : '❌ Not logged in'
  });
});

// ===== GOOGLE OAUTH ROUTES =====

// Start Google OAuth
app.get('/api/auth/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.json({
      error: 'Google OAuth not configured',
      message: 'Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env file',
      setup_url: 'https://console.cloud.google.com/apis/credentials'
    });
  }
  
  console.log('🚀 Starting Google OAuth...');
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })(req, res, next);
});

// Google OAuth callback
app.get('/api/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=auth_failed`
  }),
  (req, res) => {
    console.log('✅ Google OAuth callback success');
    console.log('👤 User logged in:', req.user.name);
    
    // Redirect to frontend with success
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/?login=success`);
  }
);

// Check authentication status
app.get('/api/auth/check', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      isAuthenticated: true,
      user: {
        id: req.user._id || req.user.googleId,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        role: req.user.role || 'user',
        loginTime: req.user.lastLogin || req.user.loginTime
      }
    });
  } else {
    res.json({
      success: true,
      isAuthenticated: false,
      user: null
    });
  }
});

// Get current user
app.get('/api/auth/me', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      data: {
        id: req.user._id || req.user.googleId,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        role: req.user.role || 'user',
        joinedDate: req.user.createdAt || null,
        lastLogin: req.user.lastLogin || req.user.loginTime
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  if (req.user) {
    const userName = req.user.name;
    req.logout((err) => {
      if (err) {
        console.error('❌ Logout error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error logging out'
        });
      }
      
      req.session.destroy((err) => {
        if (err) {
          console.error('❌ Session destroy error:', err);
        }
        
        res.clearCookie('connect.sid');
        console.log('👋 User logged out:', userName);
        
        res.json({
          success: true,
          message: `Goodbye ${userName}! You have been logged out successfully.`
        });
      });
    });
  } else {
    res.json({
      success: true,
      message: 'Already logged out'
    });
  }
});

// ===== PROPERTIES ROUTES WITH DATABASE =====

// Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    // If database is connected, try to fetch from database
    if (Property) {
      let properties = await Property.find({ status: 'active' })
        .populate('owner', 'name email avatar')
        .sort({ createdAt: -1 })
        .limit(50);

      // If no properties in database and user is logged in, create sample data
      if (properties.length === 0 && req.user) {
        console.log('📊 Creating sample properties for logged-in user...');
        
        const sampleProperties = [
          {
            title: "Sea View Luxury Apartment",
            price: 25000000,
            location: "Mumbai",
            address: "Bandra West, Mumbai, Maharashtra 400050",
            city: "Mumbai",
            bedrooms: 3,
            bathrooms: 3,
            area: 1200,
            propertyType: "apartment",
            furnishing: "furnished",
            possession: "ready",
            description: "Premium 3BHK apartment with stunning sea views in Bandra West",
            images: [{ url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", alt: "Sea View Apartment" }],
            amenities: ["Swimming Pool", "Gym", "Security Guard", "Lift", "Parking"],
            features: ["Sea-facing balconies", "Premium marble flooring", "Central AC"],
            yearBuilt: 2020,
            developer: "Lodha Group",
            owner: req.user._id,
            agent: {
              name: "Priya Sharma",
              phone: "+91 98765 43210",
              email: "priya.sharma@saarthi.com"
            }
          },
          {
            title: "Modern Villa in DLF City",
            price: 32000000,
            location: "Gurgaon",
            address: "DLF Phase 2, Gurgaon, Haryana 122002",
            city: "Gurgaon",
            bedrooms: 4,
            bathrooms: 4,
            area: 2500,
            propertyType: "villa",
            furnishing: "semi-furnished",
            possession: "ready",
            description: "Spacious 4BHK independent villa with private garden",
            images: [{ url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", alt: "Modern Villa" }],
            amenities: ["Garden", "Security Guard", "Parking", "Power Backup"],
            yearBuilt: 2019,
            developer: "DLF Limited",
            owner: req.user._id
          }
        ];

        const createdProperties = await Property.insertMany(sampleProperties);
        console.log(`✅ Created ${createdProperties.length} sample properties in database`);
        
        properties = await Property.find({ status: 'active' })
          .populate('owner', 'name email avatar')
          .sort({ createdAt: -1 });
      }

      return res.json({
        success: true,
        count: properties.length,
        total: properties.length,
        data: properties,
        user: req.user ? req.user.name : 'Guest',
        source: 'database'
      });
    }
    
    // Fallback to sample data if no database
    const sampleProperties = [
      {
        id: 1,
        title: "Sea View Luxury Apartment",
        price: 25000000,
        location: "Mumbai",
        bedrooms: 3,
        bathrooms: 3,
        area: 1200,
        propertyType: "apartment",
        furnishing: "furnished",
        possession: "ready",
        description: "Premium 3BHK apartment with stunning sea views in Bandra West",
        images: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
        amenities: ["Swimming Pool", "Gym", "Security Guard", "Lift", "Parking"]
      },
      {
        id: 2,
        title: "Modern Villa in DLF City",
        price: 32000000,
        location: "Gurgaon", 
        bedrooms: 4,
        bathrooms: 4,
        area: 2500,
        propertyType: "villa",
        furnishing: "semi-furnished",
        possession: "ready",
        description: "Spacious 4BHK independent villa with private garden in DLF Phase 2",
        images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"],
        amenities: ["Garden", "Security Guard", "Parking", "Power Backup"]
      }
    ];

    res.json({
      success: true,
      count: sampleProperties.length,
      total: sampleProperties.length,
      data: sampleProperties,
      user: req.user ? req.user.name : 'Guest',
      source: 'sample_data',
      note: 'Connect MongoDB to see database properties'
    });

  } catch (error) {
    console.error('❌ Properties fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message
    });
  }
});

// Get single property
app.get('/api/properties/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;
    
    // Try database first if available
    if (Property && propertyId.length === 24) {
      const property = await Property.findById(propertyId)
        .populate('owner', 'name email avatar');
      
      if (property) {
        // Increment view count
        property.views += 1;
        await property.save();
        
        return res.json({
          success: true,
          data: property,
          source: 'database'
        });
      }
    }
    
    // Fallback to sample data
    const sampleProperty = {
      id: 1,
      title: "Sea View Luxury Apartment",
      price: 25000000,
      location: "Mumbai",
      address: "Bandra West, Mumbai, Maharashtra 400050",
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      area: 1200,
      propertyType: "apartment",
      furnishing: "furnished",
      possession: "ready",
      description: "Premium 3BHK apartment with stunning sea views in Bandra West, Mumbai's most sought-after location.",
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Swimming Pool", "Gym", "Security Guard", "Lift", "Parking"],
      features: [
        "Sea-facing balconies in all rooms",
        "Premium marble flooring",
        "Modular kitchen with branded appliances",
        "Central air conditioning"
      ],
      nearby: [
        { name: "Bandra Station", distance: "2 km", type: "Transport" },
        { name: "Linking Road", distance: "1.5 km", type: "Shopping" }
      ],
      agent: {
        name: "Priya Sharma",
        phone: "+91 98765 43210",
        email: "priya.sharma@saarthi.com",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b0b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      },
      views: 150,
      yearBuilt: 2020
    };
    
    if (parseInt(propertyId) === 1) {
      res.json({
        success: true,
        data: sampleProperty,
        source: 'sample_data'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
  } catch (error) {
    console.error('❌ Property fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property'
    });
  }
});

// ===== CONTACT ROUTE WITH DATABASE =====

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, propertyId, interestedIn } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // If database is available, save to database
    if (Contact) {
      const contactData = {
        name,
        email,
        phone,
        subject,
        message,
        interestedIn,
        source: 'website',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      };

      // Add user if authenticated
      if (req.user && req.user._id) {
        contactData.user = req.user._id;
      }

      // Add property if specified
      if (propertyId) {
        contactData.property = propertyId;
      }

      const contact = await Contact.create(contactData);
      console.log('📞 Contact form saved to database:', contact._id);

      return res.json({
        success: true,
        message: 'Thank you! We will contact you within 24 hours.',
        data: {
          id: contact._id,
          name,
          email,
          subject,
          timestamp: contact.createdAt,
          user: req.user ? req.user.name : 'Guest'
        },
        source: 'database'
      });
    }

    // Fallback: Just log to console
    console.log('📞 Contact form submission (memory):', { name, email, subject });

    res.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      data: { 
        name, 
        email, 
        subject, 
        timestamp: new Date().toISOString(),
        user: req.user ? req.user.name : 'Guest'
      },
      source: 'memory'
    });

  } catch (error) {
    console.error('❌ Contact save error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving contact form'
    });
  }
});

// ===== USERS ROUTES WITH EMAIL NUMBER SUM CALCULATION =====

console.log('📝 Registering users routes...');

// POST /api/users - Sum calculation of numbers in user emails
app.post('/api/users', async (req, res) => {
  try {
    console.log('🧮 Users sum calculation API hit via POST!');
    console.log('Request body:', req.body);
    
    // Check if User model is available
    if (!User) {
      console.log('❌ Database not connected, using dummy data');
      
      // Dummy data for testing when database is not available
      const dummyUsers = [
        { name: "Jaskaran Guru", email: "gurujaskaran2006@gmail.com" },
        { name: "John Smith", email: "john123@gmail.com" },
        { name: "Alice Johnson", email: "alice2024@yahoo.com" },
        { name: "Bob Wilson", email: "bob456789@outlook.com" },
        { name: "Sarah Davis", email: "sarah@gmail.com" },
        { name: "Mike Brown", email: "mike789xyz@hotmail.com" }
      ];

      let totalSum = 0;
      const results = [];

      console.log('🧮 Processing dummy users for sum calculation:');
      dummyUsers.forEach((user, index) => {
        const numbers = user.email.match(/\d+/g) || [];
        const sum = numbers.reduce((acc, num) => acc + parseInt(num), 0);
        totalSum += sum;
        
        results.push({
          name: user.name,
          email: user.email,
          numbersFound: numbers,
          individualSum: sum,
          hasNumbers: numbers.length > 0
        });
        
        console.log(`${index + 1}. ${user.name}: ${user.email} → Numbers: [${numbers.join(',')}] → Sum: ${sum}`);
      });

      console.log(`\n📊 DUMMY DATA SUMMARY:`);
      console.log(`   🧮 Total Sum: ${totalSum}`);
      console.log(`   👥 Total Users: ${dummyUsers.length}`);
      console.log(`   🔢 Users with Numbers: ${results.filter(u => u.hasNumbers).length}`);

      return res.json({
        success: true,
        message: '🧮 Dummy users sum calculation completed',
        source: 'dummy_data',
        summary: {
          totalUsers: dummyUsers.length,
          usersWithNumbers: results.filter(u => u.hasNumbers).length,
          grandTotalSum: totalSum,
          averagePerUser: parseFloat((totalSum / dummyUsers.length).toFixed(2))
        },
        data: results,
        note: 'This is dummy data. Connect MongoDB to get real user data.'
      });
    }

    // Fetch users from database
    const users = await User.find({})
      .select('name email googleId avatar role createdAt lastLogin isActive')
      .sort({ createdAt: -1 });

    if (users.length === 0) {
      console.log('⚠️ No users found in database');
      return res.json({
        success: true,
        message: '👥 No users found in database',
        totalUsers: 0,
        totalSum: 0,
        data: [],
        note: 'Login with Google to create users'
      });
    }

    console.log(`👥 Found ${users.length} users in database, calculating sum...`);

    let grandTotal = 0;
    const processedUsers = [];

    // Process each user to find numbers in email and calculate sum
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. Processing user: ${user.name}`);
      console.log(`   📧 Email: ${user.email}`);
      
      // Extract all numbers from email using regex
      const emailNumbers = user.email.match(/\d+/g) || [];
      console.log(`   🔢 Numbers found: [${emailNumbers.join(', ')}]`);
      
      // Convert strings to integers and calculate sum
      const numbersAsInts = emailNumbers.map(num => parseInt(num, 10));
      const userSum = numbersAsInts.reduce((sum, num) => sum + num, 0);
      
      console.log(`   ➕ Individual sum: ${userSum}`);
      
      // Add to grand total
      grandTotal += userSum;
      
      // Store processed user data
      processedUsers.push({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        joinedDate: user.createdAt,
        lastLogin: user.lastLogin,
        isActive: user.isActive,
        emailAnalysis: {
          hasNumbers: emailNumbers.length > 0,
          numbersFound: emailNumbers,
          numbersAsIntegers: numbersAsInts,
          individualSum: userSum,
          numberCount: emailNumbers.length
        }
      });
    });

    // Calculate statistics
    const usersWithNumbers = processedUsers.filter(user => user.emailAnalysis.hasNumbers);
    const usersWithoutNumbers = processedUsers.filter(user => !user.emailAnalysis.hasNumbers);

    console.log(`\n📊 CALCULATION RESULTS:`);
    console.log(`   🧮 Grand Total Sum: ${grandTotal}`);
    console.log(`   👥 Total Users: ${users.length}`);
    console.log(`   🔢 Users with Numbers: ${usersWithNumbers.length}`);
    console.log(`   ❌ Users without Numbers: ${usersWithoutNumbers.length}`);
    console.log(`   📈 Average per User: ${users.length > 0 ? (grandTotal / users.length).toFixed(2) : 0}`);
    console.log(`   📈 Average per User with Numbers: ${usersWithNumbers.length > 0 ? (grandTotal / usersWithNumbers.length).toFixed(2) : 0}`);

    // Return comprehensive response
    res.json({
      success: true,
      message: '🧮 Users sum calculation completed successfully',
      timestamp: new Date().toISOString(),
      source: 'database',
      summary: {
        totalUsers: users.length,
        usersWithNumbers: usersWithNumbers.length,
        usersWithoutNumbers: usersWithoutNumbers.length,
        grandTotalSum: grandTotal,
        averagePerUser: users.length > 0 ? parseFloat((grandTotal / users.length).toFixed(2)) : 0,
        averagePerUserWithNumbers: usersWithNumbers.length > 0 ? 
          parseFloat((grandTotal / usersWithNumbers.length).toFixed(2)) : 0
      },
      calculations: processedUsers,
      topUsers: usersWithNumbers
        .sort((a, b) => b.emailAnalysis.individualSum - a.emailAnalysis.individualSum)
        .slice(0, 5)
        .map(user => ({
          name: user.name,
          email: user.email,
          sum: user.emailAnalysis.individualSum,
          numbers: user.emailAnalysis.numbersFound
        })),
      breakdown: {
        usersWithNumbers: usersWithNumbers.map(user => ({
          name: user.name,
          email: user.email,
          numbers: user.emailAnalysis.numbersFound,
          sum: user.emailAnalysis.individualSum
        })),
        usersWithoutNumbers: usersWithoutNumbers.map(user => ({
          name: user.name,
          email: user.email
        }))
      }
    });

  } catch (error) {
    console.error('❌ Users sum calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating users sum',
      error: error.message
    });
  }
});

// GET /api/users - Simple user list
app.get('/api/users', async (req, res) => {
  try {
    console.log('📊 Fetching users via GET...');
    
    // Check if User model is available
    if (!User) {
      console.log('❌ Database not connected');
      return res.status(503).json({
        success: false,
        message: '❌ Database not connected',
        note: 'MongoDB connection required to fetch users'
      });
    }

    // Fetch all users from database
    const users = await User.find({})
      .select('name email googleId avatar role createdAt lastLogin isActive')
      .sort({ createdAt: -1 });

    console.log(`👥 Found ${users.length} users in database`);

    if (users.length === 0) {
      return res.json({
        success: true,
        message: '👥 No users found in database',
        totalUsers: 0,
        data: [],
        note: 'Login with Google to create users'
      });
    }

    // Return simple user data without calculations
    const userData = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      joinedDate: user.createdAt,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    }));

    res.json({
      success: true,
      message: '👥 Users fetched successfully',
      totalUsers: users.length,
      data: userData,
      note: 'Use POST method to /api/users for sum calculations'
    });

  } catch (error) {
    console.error('❌ Users fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// GET /api/users/sum - Alternative sum calculation endpoint
app.get('/api/users/sum', async (req, res) => {
  try {
    console.log('🧮 Users sum calculation via GET endpoint');
    
    // Check if User model is available
    if (!User) {
      console.log('❌ Database not connected, returning dummy calculation');
      
      // Dummy calculation for testing
      const dummyEmails = [
        "gurujaskaran2006@gmail.com",
        "john123@gmail.com", 
        "alice2024@yahoo.com",
        "bob456789@outlook.com"
      ];

      let totalSum = 0;
      const results = [];

      dummyEmails.forEach((email, index) => {
        const numbers = email.match(/\d+/g) || [];
        const sum = numbers.reduce((acc, num) => acc + parseInt(num), 0);
        totalSum += sum;
        
        results.push({
          email,
          numbersFound: numbers,
          individualSum: sum
        });
        
        console.log(`${index + 1}. ${email} → Sum: ${sum}`);
      });

      console.log(`🧮 Dummy Total Sum: ${totalSum}`);

      return res.json({
        success: true,
        message: '🧮 Dummy sum calculation completed (GET method)',
        source: 'dummy_data',
        totalSum,
        userCount: dummyEmails.length,
        data: results
      });
    }

    // If database is available, fetch real users
    const users = await User.find({}).select('name email');
    
    if (users.length === 0) {
      return res.json({
        success: true,
        message: 'No users found in database',
        totalSum: 0,
        data: []
      });
    }

    let totalSum = 0;
    const results = [];

    console.log('🧮 Calculating sum for database users:');
    users.forEach((user, index) => {
      const numbers = user.email.match(/\d+/g) || [];
      const sum = numbers.reduce((acc, num) => acc + parseInt(num), 0);
      totalSum += sum;
      
      results.push({
        id: user._id,
        name: user.name,
        email: user.email,
        numbersFound: numbers,
        individualSum: sum,
        hasNumbers: numbers.length > 0
      });
      
      if (numbers.length > 0) {
        console.log(`${index + 1}. ${user.name}: ${user.email} → Sum: ${sum}`);
      }
    });

    console.log(`🧮 Database Total Sum: ${totalSum}`);

    res.json({
      success: true,
      message: '🧮 Users sum calculation completed (GET method)',
      source: 'database',
      summary: {
        totalUsers: users.length,
        usersWithNumbers: results.filter(u => u.hasNumbers).length,
        grandTotalSum: totalSum,
        averagePerUser: users.length > 0 ? parseFloat((totalSum / users.length).toFixed(2)) : 0
      },
      data: results
    });

  } catch (error) {
    console.error('❌ Users sum calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating users sum',
      error: error.message
    });
  }
});

console.log('✅ Users routes registered successfully');

// ===== 404 HANDLERS =====

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    requested_url: req.originalUrl,
    available_endpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/auth/google',
      'GET /api/auth/check',
      'GET /api/auth/me',
      'POST /api/auth/logout',
      'GET /api/properties',
      'GET /api/properties/:id',
      'POST /api/contact',
      'GET /api/users',           // 👥 Simple user list
      'POST /api/users',          // 🧮 Email sum calculation (Recommended)
      'GET /api/users/sum'        // 🧮 Alternative sum calculation
    ]
  });
});

// Global 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requested_url: req.originalUrl,
    suggestion: 'Try /api/health for API status'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Saarthi Backend API running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Properties: http://localhost:${PORT}/api/properties`);
  console.log(`🔐 Google OAuth: http://localhost:${PORT}/api/auth/google`);
  console.log(`👥 Users List: http://localhost:${PORT}/api/users`);
  console.log(`🧮 Users Sum: http://localhost:${PORT}/api/users (POST method)`);
  
  // Configuration check
  console.log('\n📋 Configuration Status:');
  console.log(`   MongoDB: ${process.env.MONGODB_URI ? '✅' : '❌'}`);
  console.log(`   Models: ${User ? '✅ Loaded' : '❌ Not loaded'}`);
  console.log(`   Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? '✅' : '❌'}`);
  console.log(`   Session Secret: ${process.env.SESSION_SECRET ? '✅' : '❌'}`);
  console.log(`   Users Sum API: ✅ Registered\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Unhandled Promise Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;

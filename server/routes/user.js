const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get all users with sum calculation (POST method)
router.post('/', async (req, res) => {
  try {
    console.log('🧮 Users sum calculation API hit via POST!');
    
    // Check if User model is available
    if (!User) {
      console.log('❌ User model not available, using dummy data');
      
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

// Get all users (GET method - simple user list)
router.get('/', async (req, res) => {
  try {
    console.log('📊 Fetching users via GET...');
    
    // Check if User model is available
    if (!User) {
      console.log('❌ User model not available');
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

// Get users sum calculation (Alternative GET endpoint)
router.get('/sum', async (req, res) => {
  try {
    console.log('🧮 Users sum calculation via GET endpoint');
    
    // Check if User model is available
    if (!User) {
      console.log('❌ User model not available, returning dummy calculation');
      
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

// Get single user sum by ID
router.get('/:id/sum', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🧮 Calculating sum for user ID: ${id}`);

    if (!User) {
      return res.status(503).json({
        success: false,
        message: '❌ Database not connected'
      });
    }

    const user = await User.findById(id).select('name email createdAt');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '👤 User not found'
      });
    }

    console.log(`👤 User: ${user.name}`);
    console.log(`📧 Email: ${user.email}`);

    // Extract numbers and calculate sum
    const emailNumbers = user.email.match(/\d+/g) || [];
    const numbersAsInts = emailNumbers.map(num => parseInt(num, 10));
    const totalSum = numbersAsInts.reduce((sum, num) => sum + num, 0);

    console.log(`🔢 Numbers found: [${emailNumbers.join(', ')}]`);
    console.log(`🧮 Total sum: ${totalSum}`);

    res.json({
      success: true,
      message: `🧮 Sum calculated for ${user.name}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        joinedDate: user.createdAt
      },
      calculation: {
        numbersFound: emailNumbers,
        numbersAsIntegers: numbersAsInts,
        totalSum,
        hasNumbers: emailNumbers.length > 0,
        numberCount: emailNumbers.length
      }
    });

  } catch (error) {
    console.error('❌ Single user sum error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating user sum',
      error: error.message
    });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'villa', 'house', 'plot', 'commercial'],
    required: true
  },
  propertyStatus: {
    type: String,
    enum: ['sale', 'rent'],
    default: 'sale'
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  garages: {
    type: Number,
    default: 0
  },
  area: {
    type: Number,
    required: true
  },
  yearBuilt: {
    type: Number
  },
  images: [{
    url: String,
    public_id: String,
    isFeatured: {
      type: Boolean,
      default: false
    }
  }],
  amenities: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'sold', 'rented'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search
propertySchema.index({
  title: 'text',
  description: 'text',
  'location.city': 'text',
  'location.address': 'text'
});

module.exports = mongoose.model('Property', propertySchema);

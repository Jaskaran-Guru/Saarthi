const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Properties routes working!' });
});

// Get all properties
router.get('/', (req, res) => {
  try {
    // Mock data for testing
    const mockProperties = [
      {
        id: '1',
        title: 'Beautiful Villa',
        price: 250000,
        location: 'Mumbai',
        bedrooms: 3,
        bathrooms: 2
      },
      {
        id: '2', 
        title: 'Modern Apartment',
        price: 180000,
        location: 'Delhi',
        bedrooms: 2,
        bathrooms: 1
      }
    ];
    
    res.json({ 
      message: 'Properties retrieved successfully',
      data: mockProperties,
      count: mockProperties.length
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error fetching properties' });
  }
});

// Get single property
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    res.json({ 
      message: `Property ${id} details - implement Prisma logic here`,
      id 
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error fetching property' });
  }
});

// Create new property
router.post('/', (req, res) => {
  try {
    const propertyData = req.body;
    
    res.status(201).json({ 
      message: 'Property created - implement Prisma logic here',
      data: propertyData
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error creating property' });
  }
});

module.exports = router;

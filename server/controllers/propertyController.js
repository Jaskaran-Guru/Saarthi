const { trackInteraction } = require('../middleware/trackingMiddleware');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      city,
      minPrice,
      maxPrice,
      bedrooms,
      propertyType,
      propertyStatus,
      search
    } = req.query;

    // Track property search
    if (req.user) {
      await trackInteraction(req, 'property_search', {
        filters: { city, minPrice, maxPrice, bedrooms, propertyType, propertyStatus },
        searchQuery: search,
        page: parseInt(page)
      });
    }

    // ... existing filter logic ...

    const properties = await Property.find(filter)
      .populate('owner', 'name email phone')
      .populate('agent', 'name email phone')
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Property.countDocuments(filter);

    res.json({
      success: true,
      data: properties,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email phone avatar')
      .populate('agent', 'name email phone avatar');

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Track property view
    if (req.user) {
      await trackInteraction(req, 'property_view', {
        propertyId: property._id,
        propertyTitle: property.title,
        propertyPrice: property.price,
        location: property.location.city
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

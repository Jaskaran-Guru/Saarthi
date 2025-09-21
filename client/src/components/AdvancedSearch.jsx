import React, { useState } from 'react';

const AdvancedSearch = ({ onSearch, onReset }) => {
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    propertyType: '',
    bhk: '',
    amenities: [],
    area: '',
    possession: '',
    furnishing: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security Guard',
    'Lift', 'Power Backup', 'Club House', 'Children Play Area',
    'CCTV', 'Intercom', 'Maintenance Staff', 'Visitor Parking'
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai',
    'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur'
  ];

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      location: '',
      priceMin: '',
      priceMax: '',
      propertyType: '',
      bhk: '',
      amenities: [],
      area: '',
      possession: '',
      furnishing: ''
    });
    onReset();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      {/* Basic Search Row */}
      <div className="grid md:grid-cols-5 gap-4 mb-4">
        {/* Location */}
        <div className="relative">
          <select
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">🏙️ Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <select
          value={filters.propertyType}
          onChange={(e) => handleInputChange('propertyType', e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">🏠 Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="house">Independent House</option>
          <option value="plot">Plot/Land</option>
          <option value="commercial">Commercial</option>
        </select>

        {/* BHK */}
        <select
          value={filters.bhk}
          onChange={(e) => handleInputChange('bhk', e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">🛏️ BHK</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4 BHK</option>
          <option value="5">5+ BHK</option>
        </select>

        {/* Budget */}
        <select
          value={filters.priceRange}
          onChange={(e) => {
            const [min, max] = e.target.value.split('-');
            handleInputChange('priceMin', min);
            handleInputChange('priceMax', max);
          }}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">💰 Budget</option>
          <option value="0-50">Under ₹50L</option>
          <option value="50-100">₹50L - ₹1Cr</option>
          <option value="100-200">₹1Cr - ₹2Cr</option>
          <option value="200-500">₹2Cr - ₹5Cr</option>
          <option value="500-">₹5Cr+</option>
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition font-semibold flex items-center justify-center gap-2"
        >
          🔍 Search
        </button>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
        >
          <span>{showAdvanced ? '▲' : '▼'}</span>
          {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </button>
        
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-700 font-medium flex items-center gap-2"
        >
          🔄 Clear All
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-6 space-y-6 border-t pt-6">
          {/* Price Range */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹ Lakh)</label>
              <input
                type="number"
                placeholder="e.g., 50"
                value={filters.priceMin}
                onChange={(e) => handleInputChange('priceMin', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹ Lakh)</label>
              <input
                type="number"
                placeholder="e.g., 200"
                value={filters.priceMax}
                onChange={(e) => handleInputChange('priceMax', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
              <select
                value={filters.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Area</option>
                <option value="0-500">Under 500</option>
                <option value="500-1000">500-1000</option>
                <option value="1000-1500">1000-1500</option>
                <option value="1500-2000">1500-2000</option>
                <option value="2000-">2000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Possession</label>
              <select
                value={filters.possession}
                onChange={(e) => handleInputChange('possession', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Any Time</option>
                <option value="ready">Ready to Move</option>
                <option value="under-construction">Under Construction</option>
                <option value="new-launch">New Launch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
              <select
                value={filters.furnishing}
                onChange={(e) => handleInputChange('furnishing', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Any</option>
                <option value="furnished">Fully Furnished</option>
                <option value="semi-furnished">Semi Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amenitiesList.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;

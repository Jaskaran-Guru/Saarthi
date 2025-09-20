// src/components/AddPropertyPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddPropertyPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Location
    country: '',
    city: '',
    address: '',
    
    // Step 2: Images
    images: [],
    featuredImage: null,
    
    // Step 3: Basics
    propertyType: 'apartment',
    bedrooms: '',
    bathrooms: '',
    garages: '',
    area: '',
    price: '',
    
    // Step 4: Details
    title: '',
    description: '',
    amenities: [],
    yearBuilt: '',
    propertyStatus: 'sale'
  });

  const [dragActive, setDragActive] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({ lat: 19.0760, lng: 72.8777 }); // Default Mumbai

  const steps = [
    { id: 1, title: 'Location', subtitle: 'Address', icon: '📍' },
    { id: 2, title: 'Images', subtitle: 'Upload', icon: '📷' },
    { id: 3, title: 'Basics', subtitle: 'Details', icon: '🏠' },
    { id: 4, title: 'Review', subtitle: 'Submit', icon: '✅' }
  ];

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 
    'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
    'Ghaziabad', 'Indore', 'Coimbatore', 'Kochi', 'Patna', 'Bhopal', 'Ludhiana'
  ];

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security', 'Lift',
    'Power Backup', 'Club House', 'Children Play Area', 'Jogging Track',
    'CCTV', 'Intercom', 'Maintenance Staff', 'Visitor Parking'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).slice(0, 10 - formData.images.length);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would submit to your backend API
    console.log('Property submitted:', formData);
    alert('Property submitted successfully! Our team will review it shortly.');
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.country && formData.city && formData.address && 
               formData.city.length >= 3 && formData.address.length >= 3;
      case 2:
        return formData.images.length >= 1;
      case 3:
        return formData.propertyType && formData.bedrooms && formData.bathrooms && 
               formData.area && formData.price;
      case 4:
        return formData.title && formData.description;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white py-6 px-8 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Saarthi</span>
          </div>
          
          <div className="hidden md:flex space-x-10 text-lg">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
            <Link to="/listing" className="text-gray-700 hover:text-primary-600 font-medium">Listing</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">Contact</Link>
            <Link to="/add-property" className="text-gray-700 hover:text-primary-600 font-medium border-b-2 border-primary-500 pb-1">Add Property</Link>
          </div>
          
          <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition text-lg font-medium">
            Log In
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">List Your Property</h1>
            <p className="text-xl text-gray-600">Reach millions of potential buyers across India</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center space-x-3 ${
                    currentStep === step.id ? 'text-primary-600' : 
                    currentStep > step.id ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                      currentStep === step.id ? 'bg-primary-500 text-white' :
                      currentStep > step.id ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}>
                      {currentStep > step.id ? '✓' : step.id}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{step.title}</div>
                      <div className="text-sm text-gray-500">{step.subtitle}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 rounded ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              {/* Step 1: Location */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Property Location</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city name"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      {formData.city && formData.city.length < 3 && (
                        <p className="text-red-500 text-sm mt-1">Must have at least 3 characters</p>
                      )}
                      
                      {/* City Suggestions */}
                      {formData.city && (
                        <div className="mt-2 bg-gray-50 rounded-lg p-2 max-h-32 overflow-y-auto">
                          <p className="text-xs text-gray-600 mb-2">Popular cities:</p>
                          <div className="flex flex-wrap gap-1">
                            {indianCities
                              .filter(city => city.toLowerCase().includes(formData.city.toLowerCase()))
                              .slice(0, 6)
                              .map(city => (
                                <button
                                  key={city}
                                  onClick={() => handleInputChange('city', city)}
                                  className="text-xs bg-white px-2 py-1 rounded border hover:bg-primary-50"
                                >
                                  {city}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter complete property address"
                        rows="3"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      />
                      {formData.address && formData.address.length < 3 && (
                        <p className="text-red-500 text-sm mt-1">Must have at least 3 characters</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Images */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Property Images</h2>
                  
                  <div className="space-y-6">
                    {/* Upload Area */}
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
                        dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                      }`}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        const files = Array.from(e.dataTransfer.files);
                        handleImageUpload(files);
                      }}
                    >
                      <div className="text-6xl mb-4">📷</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Property Images</h3>
                      <p className="text-gray-600 mb-4">Drag and drop images or click to browse</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition cursor-pointer inline-block"
                      >
                        Choose Images
                      </label>
                      <p className="text-sm text-gray-500 mt-2">Max 10 images, 5MB each</p>
                    </div>

                    {/* Image Preview */}
                    {formData.images.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Uploaded Images ({formData.images.length}/10)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Property ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                              >
                                ×
                              </button>
                              {index === 0 && (
                                <div className="absolute bottom-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                                  Cover Photo
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Basics */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Property Details</h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Property Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => handleInputChange('propertyType', e.target.value)}
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="apartment">Apartment</option>
                          <option value="villa">Independent Villa</option>
                          <option value="house">Independent House</option>
                          <option value="plot">Plot/Land</option>
                          <option value="commercial">Commercial Space</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Property Status
                        </label>
                        <select
                          value={formData.propertyStatus}
                          onChange={(e) => handleInputChange('propertyStatus', e.target.value)}
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="sale">For Sale</option>
                          <option value="rent">For Rent</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bedrooms <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={formData.bedrooms}
                          onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                          placeholder="3"
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bathrooms <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={formData.bathrooms}
                          onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                          placeholder="2"
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Garages/Parking
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={formData.garages}
                          onChange={(e) => handleInputChange('garages', e.target.value)}
                          placeholder="1"
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Area (sq ft) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.area}
                          onChange={(e) => handleInputChange('area', e.target.value)}
                          placeholder="1200"
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Price (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          placeholder="2500000"
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        {formData.price && (
                          <p className="text-sm text-gray-600 mt-1">
                            ≈ ₹{(formData.price / 10000000).toFixed(2)} Crore
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Year Built
                      </label>
                      <input
                        type="number"
                        min="1950"
                        max={new Date().getFullYear()}
                        value={formData.yearBuilt}
                        onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                        placeholder="2020"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Details & Review</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Property Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Beautiful 3BHK Apartment in Mumbai"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Property Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your property in detail..."
                        rows="5"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Amenities
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {amenitiesList.map(amenity => (
                          <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.amenities.includes(amenity)}
                              onChange={() => toggleAmenity(amenity)}
                              className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                            />
                            <span className="text-gray-700">{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-4">Property Summary</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Location:</strong> {formData.address}, {formData.city}</p>
                        <p><strong>Type:</strong> {formData.propertyType} • {formData.bedrooms} BHK</p>
                        <p><strong>Area:</strong> {formData.area} sq ft</p>
                        <p><strong>Price:</strong> ₹{formData.price?.toLocaleString()}</p>
                        <p><strong>Images:</strong> {formData.images.length} uploaded</p>
                        <p><strong>Amenities:</strong> {formData.amenities.length} selected</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-8 py-3 rounded-xl font-semibold transition ${
                    currentStep === 1 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  Previous
                </button>

                {currentStep === 4 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!isStepValid(4)}
                    className={`px-8 py-3 rounded-xl font-semibold transition ${
                      isStepValid(4)
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Property
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                    className={`px-8 py-3 rounded-xl font-semibold transition ${
                      isStepValid(currentStep)
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>

            {/* Right Side - Map */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-fit sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Property Location</h3>
                <p className="text-gray-600">
                  {formData.address || formData.city || 'Select location on the left'}
                </p>
              </div>
              
              <div className="h-96 relative">
                {/* Enhanced Map Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-100 to-green-200 relative">
                  {/* Map Grid */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-10 grid-rows-8 h-full">
                      {Array.from({length: 80}).map((_, i) => (
                        <div key={i} className="border border-gray-300"></div>
                      ))}
                    </div>
                  </div>

                  {/* Property Marker */}
                  {formData.city && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-bounce"></div>
                        <div className="absolute -top-10 -left-12 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {formData.city}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition font-bold">
                      +
                    </button>
                    <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition font-bold">
                      −
                    </button>
                  </div>

                  {!formData.city && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">🗺️</div>
                        <p>Enter location details to see map</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;

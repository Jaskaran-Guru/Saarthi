import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, trackInteraction } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [propertyData, setPropertyData] = useState({
    // Basic Information
    title: '',
    description: '',
    propertyType: '',
    listingType: 'sale', // sale or rent
    
    // Location
    address: '',
    city: '',
    state: '',
    pincode: '',
    locality: '',
    
    // Property Details
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    area: '',
    areaUnit: 'sqft',
    furnished: 'unfurnished',
    facing: '',
    floor: '',
    totalFloors: '',
    
    // Pricing
    price: '',
    pricePerSqft: '',
    priceNegotiable: false,
    maintenanceCharges: '',
    
    // Amenities
    amenities: [],
    
    // Additional Details
    yearBuilt: '',
    possession: 'ready',
    parkingSpaces: '',
    
    // Owner Details
    ownerName: user?.name || '',
    ownerPhone: '',
    ownerEmail: user?.email || '',
    
    // Images
    images: []
  });

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security Guard',
    'Lift', 'Power Backup', 'Club House', 'Children Play Area',
    'CCTV', 'Intercom', 'Maintenance Staff', 'Fire Safety',
    'Water Supply', 'Park', 'Shopping Center'
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai',
    'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPropertyData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setPropertyData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In real app, you'd upload to cloud storage
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setPropertyData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 10) // Max 10 images
    }));
  };

  const removeImage = (index) => {
    setPropertyData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      trackInteraction('property_listed', {
        propertyType: propertyData.propertyType,
        city: propertyData.city,
        price: propertyData.price
      });

      alert('Property listed successfully! Our team will review and publish it within 24 hours.');
      navigate('/listing');
    } catch (error) {
      console.error('Error submitting property:', error);
      alert('Error submitting property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Property Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                value={propertyData.title}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="e.g., Luxury 3BHK Apartment with Sea View"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={propertyData.propertyType}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">Independent House</option>
                  <option value="plot">Plot/Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing Type *
                </label>
                <select
                  name="listingType"
                  value={propertyData.listingType}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Description *
              </label>
              <textarea
                name="description"
                value={propertyData.description}
                onChange={handleInputChange}
                required
                rows="5"
                className="form-input resize-none"
                placeholder="Describe your property in detail - location, features, nearby amenities, etc."
              ></textarea>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address *
              </label>
              <textarea
                name="address"
                value={propertyData.address}
                onChange={handleInputChange}
                required
                rows="3"
                className="form-input resize-none"
                placeholder="Enter complete address with landmarks"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  name="city"
                  value={propertyData.city}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={propertyData.state}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., Maharashtra"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={propertyData.pincode}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., 400051"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Locality/Area *
                </label>
                <input
                  type="text"
                  name="locality"
                  value={propertyData.locality}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., Bandra West, Sector 21"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Specifications</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms *
                </label>
                <select
                  name="bedrooms"
                  value={propertyData.bedrooms}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms *
                </label>
                <select
                  name="bathrooms"
                  value={propertyData.bathrooms}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balconies
                </label>
                <select
                  name="balconies"
                  value={propertyData.balconies}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Built-up Area *
                </label>
                <div className="flex">
                  <input
                    type="number"
                    name="area"
                    value={propertyData.area}
                    onChange={handleInputChange}
                    required
                    className="form-input rounded-r-none"
                    placeholder="e.g., 1200"
                  />
                  <select
                    name="areaUnit"
                    value={propertyData.areaUnit}
                    onChange={handleInputChange}
                    className="form-input rounded-l-none border-l-0 w-24"
                  >
                    <option value="sqft">Sq Ft</option>
                    <option value="sqm">Sq M</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Furnishing Status *
                </label>
                <select
                  name="furnished"
                  value={propertyData.furnished}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi Furnished</option>
                  <option value="furnished">Fully Furnished</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facing Direction
                </label>
                <select
                  name="facing"
                  value={propertyData.facing}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                  <option value="north-east">North East</option>
                  <option value="south-east">South East</option>
                  <option value="north-west">North West</option>
                  <option value="south-west">South West</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor Number
                </label>
                <input
                  type="number"
                  name="floor"
                  value={propertyData.floor}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Floors
                </label>
                <input
                  type="number"
                  name="totalFloors"
                  value={propertyData.totalFloors}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 20"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing & Additional Details</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {propertyData.listingType === 'sale' ? 'Sale Price *' : 'Monthly Rent *'} (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={propertyData.price}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder={propertyData.listingType === 'sale' ? 'e.g., 25000000' : 'e.g., 50000'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Sq Ft (₹)
                </label>
                <input
                  type="number"
                  name="pricePerSqft"
                  value={propertyData.pricePerSqft}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 8500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maintenance Charges (₹/month)
                </label>
                <input
                  type="number"
                  name="maintenanceCharges"
                  value={propertyData.maintenanceCharges}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 5000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parking Spaces
                </label>
                <select
                  name="parkingSpaces"
                  value={propertyData.parkingSpaces}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Built
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={propertyData.yearBuilt}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 2020"
                  min="1950"
                  max={new Date().getFullYear()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Possession Status *
                </label>
                <select
                  name="possession"
                  value={propertyData.possession}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="ready">Ready to Move</option>
                  <option value="under-construction">Under Construction</option>
                  <option value="new-launch">New Launch</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="priceNegotiable"
                name="priceNegotiable"
                checked={propertyData.priceNegotiable}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="priceNegotiable" className="text-sm text-gray-700">
                Price is negotiable
              </label>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={propertyData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Images & Contact Information</h2>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Property Images (Max 10) *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <span className="text-4xl mb-2">📸</span>
                  <span className="text-gray-600">
                    Click to upload images or drag and drop
                  </span>
                  <span className="text-sm text-gray-500 mt-1">
                    PNG, JPG, JPEG up to 5MB each
                  </span>
                </label>
              </div>

              {/* Image Preview */}
              {propertyData.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {propertyData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Owner Contact Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={propertyData.ownerName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={propertyData.ownerPhone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={propertyData.ownerEmail}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white py-4 px-8 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Saarthi</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {!isAuthenticated && (
              <button
                onClick={() => setShowLoginModal(true)}
                className="btn-primary"
              >
                Login to Continue
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Basic Info</span>
            <span>Location</span>
            <span>Details</span>
            <span>Pricing</span>
            <span>Images</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>

                {currentStep === 5 ? (
                  <button
                    type="submit"
                    disabled={loading || !isAuthenticated}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="loading w-5 h-5"></div>
                        Submitting...
                      </div>
                    ) : (
                      '🏠 List Property'
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    Next →
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default AddPropertyPage;

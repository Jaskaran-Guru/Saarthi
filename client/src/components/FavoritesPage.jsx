import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteButton from './FavoriteButton';
import EMICalculator from './EMICalculator';
import LoginModal from './LoginModal';

const FavoritesPage = () => {
  const { user, isAuthenticated, trackInteraction } = useAuth();
  const { favorites, clearAllFavorites, getFavoritesCount } = useFavorites();
  const [showEMI, setShowEMI] = useState(false);
  const [currentPropertyForEMI, setCurrentPropertyForEMI] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  // Enhanced properties data (same as ListingPage)
  const allProperties = [
    {
      id: 1,
      title: "Sea View Luxury Apartment",
      price: 25000000,
      location: "Mumbai",
      bedrooms: 3,
      bathrooms: 3,
      area: 1200,
      propertyType: "apartment",
      possession: "ready",
      furnishing: "furnished",
      amenities: ["Swimming Pool", "Gym", "Security Guard", "Lift", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Premium 3BHK apartment with stunning sea views in Bandra West...",
      yearBuilt: 2020,
      developer: "Lodha Group",
      addedToFavorites: new Date('2024-01-15')
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
      possession: "ready",
      furnishing: "semi-furnished",
      amenities: ["Garden", "Security Guard", "Parking", "Power Backup"],
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Spacious 4BHK independent villa with private garden...",
      yearBuilt: 2019,
      developer: "DLF Limited",
      addedToFavorites: new Date('2024-01-12')
    },
    {
      id: 3,
      title: "Tech Hub Premium Apartment",
      price: 18000000,
      location: "Bangalore",
      bedrooms: 3,
      bathrooms: 2,
      area: 1400,
      propertyType: "apartment",
      possession: "under-construction",
      furnishing: "unfurnished",
      amenities: ["Gym", "Swimming Pool", "CCTV", "Lift"],
      images: [
        "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Modern 3BHK apartment near Electronic City...",
      yearBuilt: 2024,
      developer: "Prestige Group",
      addedToFavorites: new Date('2024-01-10')
    }
  ];

  // Filter properties to show only favorites
  const favoriteProperties = allProperties.filter(property => 
    favorites.includes(property.id)
  );

  // Sort properties
  const sortedProperties = [...favoriteProperties].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.addedToFavorites) - new Date(a.addedToFavorites);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'area-large':
        return b.area - a.area;
      default:
        return 0;
    }
  });

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)}L`;
    }
    return `₹${price}`;
  };

  const handleEMICalculator = (property) => {
    setCurrentPropertyForEMI(property);
    setShowEMI(true);
    trackInteraction('emi_calculator_open', {
      propertyId: property.id,
      source: 'favorites'
    });
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all properties from favorites?')) {
      clearAllFavorites();
      trackInteraction('favorites_cleared_all');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please login to view your favorite properties.
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="btn-primary w-full"
          >
            Login Now
          </button>
        </div>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-transparent py-6 px-8 border-b border-gray-200">
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
            <Link to="/add-property" className="text-gray-700 hover:text-primary-600 font-medium">Add Property</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="text-2xl">❤️</span>
              {getFavoritesCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getFavoritesCount()}
                </span>
              )}
            </div>
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💖 My Favorite Properties
          </h1>
          <p className="text-xl text-gray-600">
            {getFavoritesCount()} properties saved for later
          </p>
        </div>

        {favoriteProperties.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-6xl">💔</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No favorites yet!</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring properties and click the heart icon to save them here for easy access later.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/listing">
                <button className="btn-primary">
                  🔍 Browse Properties
                </button>
              </Link>
              <Link to="/">
                <button className="btn-secondary">
                  🏠 Back to Home
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* Properties List */
          <>
            {/* Controls */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="recent">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="area-large">Area: Large to Small</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                >
                  🗑️ Clear All
                </button>
                <Link to="/listing">
                  <button className="btn-primary">
                    ➕ Add More
                  </button>
                </Link>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="property-grid">
              {sortedProperties.map((property) => (
                <div key={property.id} className="property-card group">
                  <Link to={`/property/${property.id}`} className="relative block">
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full h-64 object-cover image-hover"
                    />
                    
                    <FavoriteButton 
                      propertyId={property.id}
                      className="absolute top-6 right-6"
                    />
                    
                    {/* Property Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ❤️ Favorited
                      </div>
                      {property.possession === 'ready' && (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Ready
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold capitalize">
                        {property.location}
                      </span>
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-2">{property.title}</h3>
                    
                    {/* Property Type & Furnishing */}
                    <div className="flex gap-2 mb-4">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
                        {property.propertyType}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">
                        {property.furnishing}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-base text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        🏠 <strong>{property.bedrooms} BHK</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        🛁 <strong>{property.bathrooms}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        📐 <strong>{property.area} sq ft</strong>
                      </span>
                    </div>

                    {/* Amenities Preview */}
                    {property.amenities && property.amenities.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {property.amenities.slice(0, 3).map(amenity => (
                            <span key={amenity} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                          {property.amenities.length > 3 && (
                            <span className="text-xs text-gray-500">+{property.amenities.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-gray-500 leading-relaxed mb-6 line-clamp-2">
                      {property.description}
                    </p>

                    {/* Added Date */}
                    <div className="text-xs text-gray-500 mb-4">
                      Added to favorites on {property.addedToFavorites.toLocaleDateString()}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link to={`/property/${property.id}`} className="flex-1">
                        <button className="btn-primary w-full">
                          View Details
                        </button>
                      </Link>
                      <button
                        onClick={() => handleEMICalculator(property)}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
                        title="EMI Calculator"
                      >
                        💰
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Favorites Summary</h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {favoriteProperties.length}
                  </div>
                  <div className="text-sm text-blue-700">Total Properties</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {formatPrice(Math.min(...favoriteProperties.map(p => p.price)))}
                  </div>
                  <div className="text-sm text-green-700">Lowest Price</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {formatPrice(Math.max(...favoriteProperties.map(p => p.price)))}
                  </div>
                  <div className="text-sm text-purple-700">Highest Price</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {Math.round(favoriteProperties.reduce((sum, p) => sum + p.price, 0) / favoriteProperties.length / 10000000 * 10) / 10}Cr
                  </div>
                  <div className="text-sm text-orange-700">Average Price</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <EMICalculator
        isOpen={showEMI}
        onClose={() => setShowEMI(false)}
        propertyPrice={currentPropertyForEMI?.price || 0}
      />

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default FavoritesPage;

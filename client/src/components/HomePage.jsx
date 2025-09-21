import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import LoginModal from './LoginModal';

const HomePage = () => {
  const { user, isAuthenticated, logout, trackInteraction } = useAuth();
  const { getFavoritesCount } = useFavorites();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    trackInteraction('login_modal_open', {
      timestamp: new Date()
    });
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

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
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 font-medium border-b-2 border-primary-500 pb-1"
              onClick={() => trackInteraction('navigation_click', { page: 'home' })}
            >
              Home
            </Link>
            <Link 
              to="/listing" 
              className="text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => trackInteraction('navigation_click', { page: 'listing' })}
            >
              Listing
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => trackInteraction('navigation_click', { page: 'contact' })}
            >
              Contact
            </Link>
            <Link 
              to="/add-property" 
              className="text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => trackInteraction('navigation_click', { page: 'add-property' })}
            >
              Add Property
            </Link>
          </div>
          
          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition shadow-lg"
              >
                <span className="text-white font-bold text-lg">
                  {getUserInitial()}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-14 bg-white rounded-lg shadow-xl border py-2 w-48 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                  
                  <Link 
                    to="/favorites" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => {
                      setShowUserMenu(false);
                      trackInteraction('favorites_click');
                    }}
                  >
                    ❤️ Favorites ({getFavoritesCount()})
                  </Link>
                  
                  <Link 
                    to="/add-property" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => {
                      setShowUserMenu(false);
                      trackInteraction('add_property_click');
                    }}
                  >
                    🏠 Add Property
                  </Link>
                  
                  <hr className="my-2" />
                  
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
              
              {showUserMenu && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)}
                ></div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition text-lg font-medium flex items-center gap-2"
            >
              <span>👤</span>
              Log In
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find Your Dream Property Across India
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl mb-8 leading-relaxed">
              Discover premium homes, apartments, and investment properties in Mumbai, Delhi, Bangalore, Pune & across India with Saarthi - your trusted real estate partner.
            </p>
            
            <div className="flex items-center space-x-4 mb-8">
              <span className="bg-primary-500 text-white px-6 py-3 rounded-full text-base font-semibold">
                🏠 Zero Brokerage Fee
              </span>
              <Link to="/listing">
                <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition text-base font-semibold">
                  Explore Properties
                </button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-3 border-white"></div>
                ))}
                <div className="w-12 h-12 rounded-full bg-primary-500 border-3 border-white flex items-center justify-center text-white text-xs font-bold">
                  50k+
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-base lg:text-lg">Happy Families Found Their Dream Homes</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
                  <span className="text-base text-gray-600">25k+ Excellent Reviews</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Modern Indian Home" 
              className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-xl font-bold text-primary-600">₹2.5Cr+</p>
              <p className="text-gray-600 text-sm">Properties Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 hover:bg-gray-50 rounded-2xl transition">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
                📋
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-xl">Verified Properties</h3>
              <p className="text-gray-600">RERA verified properties with complete documentation</p>
            </div>
            
            <div className="p-6 hover:bg-gray-50 rounded-2xl transition">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
                🔍
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-xl">Advanced Search</h3>
              <p className="text-gray-600">Smart filters to find exactly what you're looking for</p>
            </div>
            
            <div className="p-6 hover:bg-gray-50 rounded-2xl transition">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
                💰
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-xl">Best Prices</h3>
              <p className="text-gray-600">Competitive prices with no hidden charges</p>
            </div>
            
            <div className="p-6 hover:bg-gray-50 rounded-2xl transition">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
                📞
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-xl">Expert Support</h3>
              <p className="text-gray-600">Dedicated property consultants in every city</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-5 min-h-[400px]">
          <div className="lg:col-span-3 bg-teal-600 text-white p-12 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Pan-India Presence</h2>
            <p className="text-lg mb-12 leading-relaxed opacity-90">
              With properties across 25+ major Indian cities, Saarthi has helped thousands of families 
              find their perfect home. From luxury apartments in Mumbai to affordable housing in Tier-2 cities, 
              we cover all segments of the Indian real estate market.
            </p>
            
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold mb-2">25+</p>
                <p className="text-sm opacity-80">Indian Cities</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">50k+</p>
                <p className="text-sm opacity-80">Happy Families</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">1L+</p>
                <p className="text-sm opacity-80">Properties Listed</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-gradient-to-br from-green-100 to-green-200 relative">
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
              <div className="w-16 h-16 border-4 border-teal-600 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-teal-600 rounded-full"></div>
              </div>
            </div>
            <div className="absolute right-4 top-1/4 text-xs text-gray-600 transform rotate-90 origin-center">
              <p>🇮🇳 Proudly Indian • Serving the Nation Since 2020</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-8">
          <div className="mb-12">
            <h3 className="text-lg text-gray-600 mb-2">Featured Properties Across India</h3>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Premium Properties in Top Cities</h2>
            <p className="text-gray-600">Handpicked properties from Mumbai, Delhi, Bangalore, Pune & more</p>
          </div>

          <div className="property-grid">
            {/* Featured Properties from HomePage */}
            <div className="property-card group">
              <Link to="/property/1" className="relative block">
                <img 
                  src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Luxury Apartment in Mumbai" 
                  className="w-full h-64 object-cover image-hover"
                />
                <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg">
                  <span className="text-xl">❤️</span>
                </button>
              </Link>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">Mumbai</span>
                  <span className="text-3xl font-bold text-gray-900">₹2.5Cr</span>
                </div>
                <h3 className="font-bold text-xl mb-4">Sea View Luxury Apartment</h3>
                <div className="flex items-center gap-6 text-base text-gray-600 mb-6">
                  <span className="flex items-center gap-1">🏠 <strong>3</strong></span>
                  <span className="flex items-center gap-1">🛁 <strong>3</strong></span>
                  <span className="flex items-center gap-1">🚗 <strong>2</strong></span>
                  <span className="flex items-center gap-1">📐 <strong>1200</strong></span>
                </div>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Premium 3BHK apartment with stunning sea views in Bandra West, Mumbai's most sought-after location...
                </p>
                <Link to="/property/1">
                  <button className="btn-primary w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>

            {/* Add more featured properties similarly */}
            <div className="property-card group">
              <Link to="/property/2" className="relative block">
                <img 
                  src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Modern Villa in Delhi" 
                  className="w-full h-64 object-cover image-hover"
                />
                <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg">
                  <span className="text-xl">❤️</span>
                </button>
              </Link>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">Gurgaon</span>
                  <span className="text-3xl font-bold text-gray-900">₹3.2Cr</span>
                </div>
                <h3 className="font-bold text-xl mb-4">Modern Villa in DLF City</h3>
                <div className="flex items-center gap-6 text-base text-gray-600 mb-6">
                  <span className="flex items-center gap-1">🏠 <strong>4</strong></span>
                  <span className="flex items-center gap-1">🛁 <strong>4</strong></span>
                  <span className="flex items-center gap-1">🚗 <strong>3</strong></span>
                  <span className="flex items-center gap-1">📐 <strong>2500</strong></span>
                </div>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Spacious 4BHK independent villa with private garden in DLF Phase 2, perfect for families...
                </p>
                <Link to="/property/2">
                  <button className="btn-primary w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>

            {/* Continue with more properties */}
            <div className="property-card group">
              <Link to="/property/3" className="relative block">
                <img 
                  src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Tech Hub Apartment Bangalore" 
                  className="w-full h-64 object-cover image-hover"
                />
                <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg">
                  <span className="text-xl">❤️</span>
                </button>
              </Link>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">Bangalore</span>
                  <span className="text-3xl font-bold text-gray-900">₹1.8Cr</span>
                </div>
                <h3 className="font-bold text-xl mb-4">Tech Hub Premium Apartment</h3>
                <div className="flex items-center gap-6 text-base text-gray-600 mb-6">
                  <span className="flex items-center gap-1">🏠 <strong>3</strong></span>
                  <span className="flex items-center gap-1">🛁 <strong>2</strong></span>
                  <span className="flex items-center gap-1">🚗 <strong>2</strong></span>
                  <span className="flex items-center gap-1">📐 <strong>1400</strong></span>
                </div>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Modern 3BHK apartment near Electronic City, perfect for IT professionals with world-class amenities...
                </p>
                <Link to="/property/3">
                  <button className="btn-primary w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>

            <div className="property-card group">
              <Link to="/property/4" className="relative block">
                <img 
                  src="https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Family Home Pune" 
                  className="w-full h-64 object-cover image-hover"
                />
                <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg">
                  <span className="text-xl">❤️</span>
                </button>
              </Link>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">Pune</span>
                  <span className="text-3xl font-bold text-gray-900">₹1.2Cr</span>
                </div>
                <h3 className="font-bold text-xl mb-4">Family Paradise in Hinjewadi</h3>
                <div className="flex items-center gap-6 text-base text-gray-600 mb-6">
                  <span className="flex items-center gap-1">🏠 <strong>2</strong></span>
                  <span className="flex items-center gap-1">🛁 <strong>2</strong></span>
                  <span className="flex items-center gap-1">🚗 <strong>1</strong></span>
                  <span className="flex items-center gap-1">📐 <strong>980</strong></span>
                </div>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Cozy 2BHK apartment in gated community near IT parks with excellent connectivity and amenities...
                </p>
                <Link to="/property/4">
                  <button className="btn-primary w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Ready to Find Your Dream Home in India?</h2>
          <p className="text-xl text-green-100 mb-12">Join thousands of happy families across 25+ cities who found their perfect property with Saarthi</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listing">
              <button className="bg-white text-primary-600 px-12 py-4 rounded-lg hover:bg-gray-100 transition text-lg font-semibold">
                Browse Properties
              </button>
            </Link>
            <Link to="/contact">
              <button className="border-2 border-white text-white px-12 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition text-lg font-semibold">
                Contact Expert
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default HomePage;

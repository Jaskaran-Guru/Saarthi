import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties?featured=true');
      setProperties(response.data.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-transparent py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Saarthi</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary-600 font-medium border-b-2 border-primary-500">Home</a>
            <a href="#listing" className="text-gray-700 hover:text-primary-600 font-medium">Listing</a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 font-medium">Contact</a>
            <a href="#add-property" className="text-gray-700 hover:text-primary-600 font-medium">Add Property</a>
          </div>
          
          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition">
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Discover Your Dream Property Today
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Find the perfect home, apartment, or investment property with Saarthi - your trusted real estate partner.
            </p>
            
            {/* Promo Badge */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm">
                10% OFF On All Properties
              </span>
              <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
                Explore
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                ))}
                <div className="w-10 h-10 rounded-full bg-primary-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  210k+
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">People successfully got their dream homes</p>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-sm text-gray-600">127k Excellent Reviews</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <img 
              src="/api/placeholder/600/400" 
              alt="Dream House" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                📋
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Detailed Listings</h3>
              <p className="text-gray-600 text-sm">Comprehensive property information</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                🔍
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Property Search</h3>
              <p className="text-gray-600 text-sm">Advanced search and filtering</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                ⭐
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Saved Favorites</h3>
              <p className="text-gray-600 text-sm">Save properties you love</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                📅
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Book Visits</h3>
              <p className="text-gray-600 text-sm">Schedule property viewings</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// src/components/ListingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListingPage = () => {
  // Updated Indian property data with proper pricing
  const allProperties = [
    {
      id: 1,
      title: "Sea View Luxury Apartment",
      price: 25000000, // ₹2.5 Crore
      location: "Mumbai",
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Premium 3BHK apartment with stunning sea views in Bandra West, Mumbai's most sought-after location..."
    },
    {
      id: 2,
      title: "Modern Villa in DLF City",
      price: 32000000, // ₹3.2 Crore
      location: "Gurgaon",
      bedrooms: 4,
      bathrooms: 4,
      garages: 3,
      area: 2500,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Spacious 4BHK independent villa with private garden in DLF Phase 2, perfect for families..."
    },
    {
      id: 3,
      title: "Tech Hub Premium Apartment",
      price: 18000000, // ₹1.8 Crore
      location: "Bangalore",
      bedrooms: 3,
      bathrooms: 2,
      garages: 2,
      area: 1400,
      image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Modern 3BHK apartment near Electronic City, perfect for IT professionals with world-class amenities..."
    },
    {
      id: 4,
      title: "Family Paradise in Hinjewadi",
      price: 12000000, // ₹1.2 Crore
      location: "Pune",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 980,
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Cozy 2BHK apartment in gated community near IT parks with excellent connectivity and amenities..."
    },
    {
      id: 5,
      title: "Luxury Penthouse Hyderabad",
      price: 15000000, // ₹1.5 Crore
      location: "Hyderabad",
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      area: 1600,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Stunning penthouse in HITEC City with panoramic views and premium amenities..."
    },
    {
      id: 6,
      title: "Heritage Villa Chennai",
      price: 22000000, // ₹2.2 Crore
      location: "Chennai",
      bedrooms: 4,
      bathrooms: 3,
      garages: 2,
      area: 2200,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Beautiful heritage-style villa in Anna Nagar with traditional architecture and modern amenities..."
    },
    {
      id: 7,
      title: "Smart Home in Noida",
      price: 9500000, // ₹95 Lakh
      location: "Noida",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 1100,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Modern 2BHK smart home in Sector 62 with automated systems and premium facilities..."
    },
    {
      id: 8,
      title: "Riverside Apartment Kolkata",
      price: 8000000, // ₹80 Lakh
      location: "Kolkata",
      bedrooms: 3,
      bathrooms: 2,
      garages: 1,
      area: 1300,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Elegant 3BHK apartment near Hooghly River with traditional Bengali architecture..."
    },
    {
      id: 9,
      title: "Garden Villa Ahmedabad",
      price: 14000000, // ₹1.4 Crore
      location: "Ahmedabad",
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Spacious villa with lush garden in Satellite area, perfect for families who love nature..."
    },
    {
      id: 10,
      title: "Lake View Apartment Bhopal",
      price: 6500000, // ₹65 Lakh
      location: "Bhopal",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 950,
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Beautiful 2BHK apartment overlooking Upper Lake with serene environment and modern amenities..."
    },
    {
      id: 11,
      title: "Hill Station Cottage Shimla",
      price: 11000000, // ₹1.1 Crore
      location: "Shimla",
      bedrooms: 3,
      bathrooms: 2,
      garages: 1,
      area: 1500,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Charming cottage in the hills with mountain views and cozy fireplace, perfect for peaceful living..."
    },
    {
      id: 12,
      title: "Beach House Goa",
      price: 16000000, // ₹1.6 Crore
      location: "Goa",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 1200,
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Stunning beach house near Calangute with direct beach access and Portuguese architecture..."
    }
  ];

  const [properties, setProperties] = useState(allProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    location: ''
  });

  // Search and filter function
  useEffect(() => {
    let filteredProperties = allProperties;

    // Search by title or location
    if (searchQuery) {
      filteredProperties = filteredProperties.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range (in Crore)
    if (filters.minPrice) {
      const minPriceInRupees = parseFloat(filters.minPrice) * 10000000; // Convert Crore to Rupees
      filteredProperties = filteredProperties.filter(property =>
        property.price >= minPriceInRupees
      );
    }
    if (filters.maxPrice) {
      const maxPriceInRupees = parseFloat(filters.maxPrice) * 10000000; // Convert Crore to Rupees
      filteredProperties = filteredProperties.filter(property =>
        property.price <= maxPriceInRupees
      );
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter(property =>
        property.bedrooms >= parseInt(filters.bedrooms)
      );
    }

    // Filter by location
    if (filters.location) {
      filteredProperties = filteredProperties.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setProperties(filteredProperties);
  }, [searchQuery, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      location: ''
    });
    setSearchQuery('');
  };

  // Format price in Indian format
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)}L`;
    } else {
      return `₹${(price / 1000).toFixed(0)}K`;
    }
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
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
            <Link to="/listing" className="text-gray-700 hover:text-primary-600 font-medium border-b-2 border-primary-500 pb-1">Listing</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">Contact</Link>
            <a href="/add-property" className="text-gray-700 hover:text-primary-600 font-medium">Add Property</a>
          </div>
          
          <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition text-lg font-medium">
            Log In
          </button>
        </div>
      </nav>

      {/* Search Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Premium Properties Across India
            </h1>
            <p className="text-xl text-gray-600">
              Find your perfect home in Mumbai, Delhi, Bangalore, and 25+ cities
            </p>
          </div>

          {/* Main Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by property name, city, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600 transition">
                  🔍
                </button>
              </div>
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹ Crore)</label>
                <input
                  type="number"
                  placeholder="0.5"
                  step="0.1"
                  min="0.1"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹ Crore)</label>
                <input
                  type="number"
                  placeholder="5.0"
                  step="0.1"
                  min="0.1"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+ BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Cities</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Noida">Noida</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Bhopal">Bhopal</option>
                  <option value="Shimla">Shimla</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <button
                  onClick={clearFilters}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => handleFilterChange('location', 'Mumbai')}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition"
            >
              Mumbai Properties
            </button>
            <button 
              onClick={() => handleFilterChange('location', 'Bangalore')}
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200 transition"
            >
              Bangalore IT Hub
            </button>
            <button 
              onClick={() => handleFilterChange('bedrooms', '2')}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition"
            >
              2+ BHK
            </button>
            <button 
              onClick={() => {
                handleFilterChange('minPrice', '1');
                handleFilterChange('maxPrice', '2');
              }}
              className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full hover:bg-yellow-200 transition"
            >
              ₹1-2 Cr Budget
            </button>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Properties ({properties.length} results found)
            </h2>
            <p className="text-gray-600">
              {searchQuery && `Showing results for "${searchQuery}"`}
              {filters.location && ` in ${filters.location}`}
            </p>
          </div>

          {/* Property Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2">
                {/* Clickable Image - navigates to property detail */}
                <Link to={`/property/${property.id}`} className="relative block">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500 cursor-pointer"
                  />
                  <button 
                    className="absolute top-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg z-10"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation when clicking heart
                      e.stopPropagation();
                      // Add to favorites logic here
                      console.log('Added to favorites:', property.id);
                    }}
                  >
                    <span className="text-xl">❤️</span>
                  </button>
                  
                  {/* Property Badge */}
                  <div className="absolute top-6 left-6 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Premium
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
                  
                  <h3 className="font-bold text-xl mb-4">{property.title}</h3>
                  
                  <div className="flex items-center gap-6 text-base text-gray-600 mb-6">
                    <span className="flex items-center gap-1">
                      🏠 <strong>{property.bedrooms} BHK</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      🛁 <strong>{property.bathrooms}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      🚗 <strong>{property.garages}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      📐 <strong>{property.area} sq ft</strong>
                    </span>
                  </div>
                  
                  <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                    {property.description}
                  </p>
                  
                  {/* View Details Button - navigates to property detail */}
                  <Link to={`/property/${property.id}`}>
                    <button className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {properties.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all properties</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={clearFilters}
                  className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition font-medium"
                >
                  Clear All Filters
                </button>
                <Link to="/" className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition font-medium">
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* Load More Button */}
          {properties.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-gray-200 text-gray-800 px-12 py-4 rounded-xl font-semibold hover:bg-gray-300 transition">
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </section>

      {/* City Statistics Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Cities for Investment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { city: "Mumbai", properties: "15k+", avgPrice: "₹2.5Cr" },
              { city: "Bangalore", properties: "12k+", avgPrice: "₹1.8Cr" },
              { city: "Gurgaon", properties: "8k+", avgPrice: "₹2.2Cr" },
              { city: "Pune", properties: "10k+", avgPrice: "₹1.5Cr" }
            ].map((city, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{city.city}</h3>
                <p className="text-gray-600 mb-1">{city.properties} Properties</p>
                <p className="text-primary-600 font-semibold">Avg. {city.avgPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListingPage;

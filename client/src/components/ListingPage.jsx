import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import LoginModal from './LoginModal';
import FavoriteButton from './FavoriteButton';
import EMICalculator from './EMICalculator';
import MapView from './MapView';

const ListingPage = () => {
  // Complete Enhanced property data with all details
  const allProperties = [
    {
      id: 1,
      title: "Sea View Luxury Apartment",
      price: 25000000,
      location: "Mumbai",
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      area: 1200,
      propertyType: "apartment",
      possession: "ready",
      furnishing: "furnished",
      amenities: ["Swimming Pool", "Gym", "Security Guard", "Lift", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Premium 3BHK apartment with stunning sea views in Bandra West, Mumbai's most sought-after location...",
      yearBuilt: 2020,
      developer: "Lodha Group"
    },
    {
      id: 2,
      title: "Modern Villa in DLF City",
      price: 32000000,
      location: "Gurgaon",
      bedrooms: 4,
      bathrooms: 4,
      garages: 3,
      area: 2500,
      propertyType: "villa",
      possession: "ready",
      furnishing: "semi-furnished",
      amenities: ["Garden", "Security Guard", "Parking", "Power Backup", "Club House"],
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Spacious 4BHK independent villa with private garden in DLF Phase 2, perfect for families...",
      yearBuilt: 2019,
      developer: "DLF Limited"
    },
    {
      id: 3,
      title: "Tech Hub Premium Apartment",
      price: 18000000,
      location: "Bangalore",
      bedrooms: 3,
      bathrooms: 2,
      garages: 2,
      area: 1400,
      propertyType: "apartment",
      possession: "under-construction",
      furnishing: "unfurnished",
      amenities: ["Gym", "Swimming Pool", "CCTV", "Lift", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Modern 3BHK apartment near Electronic City, perfect for IT professionals with world-class amenities...",
      yearBuilt: 2024,
      developer: "Prestige Group"
    },
    {
      id: 4,
      title: "Family Paradise in Hinjewadi",
      price: 12000000,
      location: "Pune",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 980,
      propertyType: "apartment",
      possession: "ready",
      furnishing: "semi-furnished",
      amenities: ["Children Play Area", "Garden", "Security Guard", "Lift"],
      images: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Cozy 2BHK apartment in gated community near IT parks with excellent connectivity and amenities...",
      yearBuilt: 2021,
      developer: "Godrej Properties"
    },
    {
      id: 5,
      title: "Luxury Penthouse Hyderabad",
      price: 15000000,
      location: "Hyderabad",
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      area: 1600,
      propertyType: "apartment",
      possession: "ready",
      furnishing: "furnished",
      amenities: ["Swimming Pool", "Gym", "Club House", "Parking", "Lift"],
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Stunning penthouse in HITEC City with panoramic views and premium amenities...",
      yearBuilt: 2022,
      developer: "Phoenix Mills"
    },
    {
      id: 6,
      title: "Heritage Villa Chennai",
      price: 22000000,
      location: "Chennai",
      bedrooms: 4,
      bathrooms: 3,
      garages: 2,
      area: 2200,
      propertyType: "villa",
      possession: "ready",
      furnishing: "semi-furnished",
      amenities: ["Garden", "Security Guard", "Parking", "Power Backup"],
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Beautiful heritage-style villa in Anna Nagar with traditional architecture and modern amenities...",
      yearBuilt: 2020,
      developer: "TVS Group"
    },
    {
      id: 7,
      title: "Smart Home in Noida",
      price: 9500000,
      location: "Noida",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 1100,
      propertyType: "apartment",
      possession: "new-launch",
      furnishing: "furnished",
      amenities: ["Gym", "Lift", "CCTV", "Power Backup", "Intercom"],
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Modern 2BHK smart home in Sector 62 with automated systems and premium facilities...",
      yearBuilt: 2025,
      developer: "Supertech Limited"
    },
    {
      id: 8,
      title: "Riverside Apartment Kolkata",
      price: 8000000,
      location: "Kolkata",
      bedrooms: 3,
      bathrooms: 2,
      garages: 1,
      area: 1300,
      propertyType: "apartment",
      possession: "ready",
      furnishing: "unfurnished",
      amenities: ["Garden", "Security Guard", "Lift", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      description: "Elegant 3BHK apartment near Hooghly River with traditional Bengali architecture...",
      yearBuilt: 2018,
      developer: "Merlin Group"
    }
  ];

  const [properties] = useState(allProperties);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showEMI, setShowEMI] = useState(false);
  const [currentPropertyForEMI, setCurrentPropertyForEMI] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const { user, isAuthenticated, logout, trackInteraction } = useAuth();
  const { getFavoritesCount } = useFavorites();

  // Advanced filters state
  const [filters, setFilters] = useState({
    searchQuery: '',
    location: '',
    propertyType: '',
    bhk: '',
    minPrice: '',
    maxPrice: '',
    possession: '',
    furnishing: '',
    amenities: [],
    areaMin: '',
    areaMax: ''
  });

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security Guard',
    'Lift', 'Power Backup', 'Club House', 'Children Play Area',
    'CCTV', 'Intercom', 'Maintenance Staff'
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Gurgaon', 'Bangalore', 'Pune', 'Hyderabad',
    'Chennai', 'Kolkata', 'Noida', 'Ahmedabad', 'Bhopal', 'Shimla', 'Goa'
  ];

  const handleFilterChange = (field, value) => {
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

  // Search and filter logic
  useEffect(() => {
    let filtered = [...allProperties];

    // Search by title or location
    if (filters.searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(property =>
        property.propertyType === filters.propertyType
      );
    }

    // BHK filter
    if (filters.bhk) {
      filtered = filtered.filter(property =>
        property.bedrooms >= parseInt(filters.bhk)
      );
    }

    // Price filter (convert crores to rupees)
    if (filters.minPrice || filters.maxPrice) {
      filtered = filtered.filter(property => {
        const priceInCrores = property.price / 10000000;
        const min = filters.minPrice ? parseFloat(filters.minPrice) : 0;
        const max = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
        return priceInCrores >= min && priceInCrores <= max;
      });
    }

    // Area filter
    if (filters.areaMin || filters.areaMax) {
      filtered = filtered.filter(property => {
        const area = property.area;
        const min = filters.areaMin ? parseFloat(filters.areaMin) : 0;
        const max = filters.areaMax ? parseFloat(filters.areaMax) : Infinity;
        return area >= min && area <= max;
      });
    }

    // Possession filter
    if (filters.possession) {
      filtered = filtered.filter(property =>
        property.possession === filters.possession
      );
    }

    // Furnishing filter
    if (filters.furnishing) {
      filtered = filtered.filter(property =>
        property.furnishing === filters.furnishing
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.some(amenity =>
          property.amenities && property.amenities.includes(amenity)
        )
      );
    }

    // Apply sorting
    filtered = applySorting(filtered, sortBy);

    setFilteredProperties(filtered);
  }, [filters, sortBy]);

  // Sorting function
  const applySorting = (propertyList, sortOption) => {
    const sorted = [...propertyList];
    
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'area-large':
        return sorted.sort((a, b) => b.area - a.area);
      case 'area-small':
        return sorted.sort((a, b) => a.area - b.area);
      case 'newest':
        return sorted.sort((a, b) => b.yearBuilt - a.yearBuilt);
      case 'oldest':
        return sorted.sort((a, b) => a.yearBuilt - b.yearBuilt);
      default:
        return sorted;
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      location: '',
      propertyType: '',
      bhk: '',
      minPrice: '',
      maxPrice: '',
      possession: '',
      furnishing: '',
      amenities: [],
      areaMin: '',
      areaMax: ''
    });
    setSortBy('relevance');
  };

  // Format price
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)}L`;
    } else {
      return `₹${(price / 1000).toFixed(0)}K`;
    }
  };

  const handleEMICalculator = (property) => {
    setCurrentPropertyForEMI(property);
    setShowEMI(true);
    if (trackInteraction) {
      trackInteraction('emi_calculator_open', {
        propertyId: property.id,
        propertyPrice: property.price
      });
    }
  };

  const handleQuickFilter = (filterType, value) => {
    if (filterType === 'location') {
      setFilters(prev => ({ ...prev, location: value }));
    } else if (filterType === 'bhk') {
      setFilters(prev => ({ ...prev, bhk: value }));
    } else if (filterType === 'priceRange') {
      const [min, max] = value.split('-');
      setFilters(prev => ({ 
        ...prev, 
        minPrice: min || '', 
        maxPrice: max || '' 
      }));
    } else if (filterType === 'possession') {
      setFilters(prev => ({ ...prev, possession: value }));
    }
  };

  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
    setShowUserMenu(false);
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
              className="text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => trackInteraction && trackInteraction('navigation_click', { page: 'home' })}
            >
              Home
            </Link>
            <Link 
              to="/listing" 
              className="text-gray-700 hover:text-primary-600 font-medium border-b-2 border-primary-500 pb-1"
            >
              Listing
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => trackInteraction && trackInteraction('navigation_click', { page: 'contact' })}
            >
              Contact
            </Link>
            <Link 
              to="/add-property" 
              className="text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => trackInteraction && trackInteraction('navigation_click', { page: 'add-property' })}
            >
              Add Property
            </Link>
          </div>
          
          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/favorites" className="relative">
                <button className="p-2 text-gray-600 hover:text-primary-600 transition">
                  <span className="text-2xl">❤️</span>
                  {getFavoritesCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getFavoritesCount()}
                    </span>
                  )}
                </button>
              </Link>
              
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
                  <>
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
                          trackInteraction && trackInteraction('favorites_click');
                        }}
                      >
                        ❤️ Favorites ({getFavoritesCount()})
                      </Link>
                      
                      <Link 
                        to="/add-property" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => {
                          setShowUserMenu(false);
                          trackInteraction && trackInteraction('add_property_click');
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
                    
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition text-lg font-medium flex items-center gap-2"
            >
              <span>👤</span>
              Log In
            </button>
          )}
        </div>
      </nav>

      {/* Advanced Search Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Premium Properties Across India
            </h1>
            <p className="text-xl text-gray-600">
              Find your perfect home with our advanced search filters
            </p>
            
            {/* View Toggle */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setShowMap(false)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  !showMap ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                📋 List View
              </button>
              <button
                onClick={() => setShowMap(true)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  showMap ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                🗺️ Map View
              </button>
            </div>
          </div>

          {/* Advanced Search Component */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* Basic Search Row */}
            <div className="grid md:grid-cols-5 gap-4 mb-6">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search properties..."
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* City Dropdown */}
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">🏙️ Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              {/* Property Type */}
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">🏠 Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">Independent House</option>
                <option value="plot">Plot/Land</option>
              </select>

              {/* BHK */}
              <select
                value={filters.bhk}
                onChange={(e) => handleFilterChange('bhk', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">🛏️ BHK</option>
                <option value="1">1+ BHK</option>
                <option value="2">2+ BHK</option>
                <option value="3">3+ BHK</option>
                <option value="4">4+ BHK</option>
              </select>

              {/* Budget Range */}
              <select
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-');
                  handleFilterChange('minPrice', min);
                  handleFilterChange('maxPrice', max || '');
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">💰 Budget</option>
                <option value="0-0.5">Under ₹50L</option>
                <option value="0.5-1">₹50L - ₹1Cr</option>
                <option value="1-2">₹1Cr - ₹2Cr</option>
                <option value="2-5">₹2Cr - ₹5Cr</option>
                <option value="5-">₹5Cr+</option>
              </select>
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
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-gray-700 font-medium flex items-center gap-2"
              >
                🔄 Clear All
              </button>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvanced && (
              <div className="mt-6 space-y-6 border-t pt-6 animate-slideUp">
                {/* Price Range */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹ Crore)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 1.5"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹ Crore)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 5.0"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Area Range */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Area (sq ft)</label>
                    <input
                      type="number"
                      placeholder="e.g., 500"
                      value={filters.areaMin}
                      onChange={(e) => handleFilterChange('areaMin', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Area (sq ft)</label>
                    <input
                      type="number"
                      placeholder="e.g., 3000"
                      value={filters.areaMax}
                      onChange={(e) => handleFilterChange('areaMax', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Possession Status</label>
                    <select
                      value={filters.possession}
                      onChange={(e) => handleFilterChange('possession', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Any Time</option>
                      <option value="ready">Ready to Move</option>
                      <option value="under-construction">Under Construction</option>
                      <option value="new-launch">New Launch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing Status</label>
                    <select
                      value={filters.furnishing}
                      onChange={(e) => handleFilterChange('furnishing', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Any</option>
                      <option value="furnished">Fully Furnished</option>
                      <option value="semi-furnished">Semi Furnished</option>
                      <option value="unfurnished">Unfurnished</option>
                    </select>
                  </div>
                </div>

                {/* Amenities Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Select Amenities</label>
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

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => handleQuickFilter('location', 'Mumbai')}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition"
            >
              Mumbai Properties
            </button>
            <button 
              onClick={() => handleQuickFilter('location', 'Bangalore')}
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200 transition"
            >
              Bangalore IT Hub
            </button>
            <button 
              onClick={() => handleQuickFilter('bhk', '2')}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition"
            >
              2+ BHK
            </button>
            <button 
              onClick={() => handleQuickFilter('priceRange', '1-2')}
              className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full hover:bg-yellow-200 transition"
            >
              ₹1-2 Cr Budget
            </button>
            <button 
              onClick={() => handleQuickFilter('possession', 'ready')}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-full hover:bg-red-200 transition"
            >
              Ready to Move
            </button>
          </div>

          {/* Results Count & Sort */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Properties ({filteredProperties.length} results found)
              </h2>
              <p className="text-gray-600">
                {filters.searchQuery && `Results for "${filters.searchQuery}"`}
                {filters.location && ` in ${filters.location}`}
                {filters.amenities.length > 0 && ` with ${filters.amenities.join(', ')}`}
              </p>
            </div>
            
            <div className="flex gap-2">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="area-large">Area: Large to Small</option>
                <option value="area-small">Area: Small to Large</option>
              </select>
            </div>
          </div>

          {/* Map or List View */}
          {showMap ? (
            <MapView 
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
            />
          ) : (
            /* Property Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2">
                  <Link to={`/property/${property.id}`} className="relative block">
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                    />
                    
                    <FavoriteButton 
                      propertyId={property.id}
                      className="absolute top-6 right-6"
                    />
                    
                    {/* Property Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Premium
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
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link to={`/property/${property.id}`} className="flex-1">
                        <button className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition">
                          View Details
                        </button>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEMICalculator(property);
                        }}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
                        title="EMI Calculator"
                      >
                        💰
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={clearAllFilters}
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
          {filteredProperties.length > 0 && filteredProperties.length >= 8 && (
            <div className="text-center mt-12">
              <button 
                onClick={() => alert('Load more functionality will be implemented with pagination!')}
                className="bg-gray-200 text-gray-800 px-12 py-4 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
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
              <div 
                key={index} 
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition cursor-pointer"
                onClick={() => handleQuickFilter('location', city.city)}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{city.city}</h3>
                <p className="text-gray-600 mb-1">{city.properties} Properties</p>
                <p className="text-primary-600 font-semibold">Avg. {city.avgPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

export default ListingPage;

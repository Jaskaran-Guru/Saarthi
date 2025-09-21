import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MapView = ({ properties, selectedProperty, onPropertySelect }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai
  const [zoom, setZoom] = useState(6);
  const [hoveredProperty, setHoveredProperty] = useState(null);

  // City coordinates for Indian cities
  const cityCoordinates = {
    'Mumbai': { lat: 19.0760, lng: 72.8777 },
    'Delhi': { lat: 28.6139, lng: 77.2090 },
    'Gurgaon': { lat: 28.4595, lng: 77.0266 },
    'Bangalore': { lat: 12.9716, lng: 77.5946 },
    'Pune': { lat: 18.5204, lng: 73.8567 },
    'Hyderabad': { lat: 17.3850, lng: 78.4867 },
    'Chennai': { lat: 13.0827, lng: 80.2707 },
    'Kolkata': { lat: 22.5726, lng: 88.3639 },
    'Noida': { lat: 28.5355, lng: 77.3910 },
    'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
    'Bhopal': { lat: 23.2599, lng: 77.4126 },
    'Shimla': { lat: 31.1048, lng: 77.1734 },
    'Goa': { lat: 15.2993, lng: 74.1240 }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)}L`;
    }
    return `₹${price}`;
  };

  const getCityStats = () => {
    const cityStats = {};
    properties.forEach(property => {
      const city = property.location;
      if (!cityStats[city]) {
        cityStats[city] = { count: 0, avgPrice: 0, totalPrice: 0 };
      }
      cityStats[city].count++;
      cityStats[city].totalPrice += property.price;
    });
    
    Object.keys(cityStats).forEach(city => {
      cityStats[city].avgPrice = cityStats[city].totalPrice / cityStats[city].count;
    });
    
    return cityStats;
  };

  const cityStats = getCityStats();

  const getPropertyPositions = () => {
    const positions = {};
    const cityOffsets = {};
    
    properties.forEach((property, index) => {
      const cityCoord = cityCoordinates[property.location];
      if (cityCoord) {
        // Create slight offsets for multiple properties in same city
        if (!cityOffsets[property.location]) {
          cityOffsets[property.location] = 0;
        }
        
        const offset = cityOffsets[property.location] * 0.05;
        positions[property.id] = {
          lat: cityCoord.lat + (Math.random() - 0.5) * 0.1 + offset,
          lng: cityCoord.lng + (Math.random() - 0.5) * 0.1 + offset
        };
        
        cityOffsets[property.location]++;
      }
    });
    
    return positions;
  };

  const propertyPositions = getPropertyPositions();

  const handleCityClick = (city) => {
    const coord = cityCoordinates[city];
    if (coord) {
      setMapCenter(coord);
      setZoom(10);
    }
  };

  const handlePropertyClick = (property) => {
    if (onPropertySelect) {
      onPropertySelect(property);
    }
    const position = propertyPositions[property.id];
    if (position) {
      setMapCenter(position);
      setZoom(12);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">🗺️ Properties Map View</h3>
            <p className="text-gray-600">Explore {properties.length} properties across India</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setZoom(Math.min(zoom + 1, 15))}
              className="w-10 h-10 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition font-bold"
            >
              +
            </button>
            <button
              onClick={() => setZoom(Math.max(zoom - 1, 4))}
              className="w-10 h-10 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition font-bold"
            >
              −
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
        {/* Enhanced Map Background with Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-20 grid-rows-12 h-full">
            {Array.from({length: 240}).map((_, i) => (
              <div key={i} className="border border-gray-400"></div>
            ))}
          </div>
        </div>

        {/* India Outline (Simplified) */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 800 500">
            <path
              d="M200 100 L300 80 L400 90 L500 100 L580 120 L600 180 L580 250 L500 300 L450 350 L400 400 L350 420 L300 400 L250 350 L200 300 L150 250 L120 200 L150 150 Z"
              fill="rgba(34, 197, 94, 0.1)"
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* City Markers */}
        {Object.entries(cityStats).map(([city, stats]) => {
          const coord = cityCoordinates[city];
          if (!coord) return null;
          
          // Convert lat/lng to screen coordinates (simplified)
          const x = ((coord.lng - 68) / (97 - 68)) * 100;
          const y = ((35 - coord.lat) / (35 - 8)) * 100;
          
          return (
            <div
              key={city}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ 
                left: `${Math.max(5, Math.min(95, x))}%`, 
                top: `${Math.max(5, Math.min(95, y))}%` 
              }}
              onClick={() => handleCityClick(city)}
            >
              <div className="relative group">
                <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg animate-pulse transition-all hover:scale-125 ${
                  stats.count > 2 ? 'bg-red-500' : stats.count > 1 ? 'bg-yellow-500' : 'bg-blue-500'
                }`}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs font-bold">
                    {stats.count}
                  </div>
                </div>
                
                {/* City Info Popup */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                  <div className="bg-white rounded-lg shadow-xl p-3 min-w-32 border">
                    <div className="text-xs font-semibold text-gray-900 mb-1">{city}</div>
                    <div className="text-xs text-gray-600 mb-1">{stats.count} Properties</div>
                    <div className="text-xs font-bold text-primary-600">
                      Avg: {formatPrice(stats.avgPrice)}
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-white transform rotate-45 mx-auto -mt-1.5 border-r border-b border-gray-200"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Individual Property Markers */}
        {properties.map((property) => {
          const position = propertyPositions[property.id];
          if (!position) return null;
          
          const coord = cityCoordinates[property.location];
          if (!coord) return null;
          
          // Convert lat/lng to screen coordinates
          const x = ((coord.lng - 68) / (97 - 68)) * 100;
          const y = ((35 - coord.lat) / (35 - 8)) * 100;
          
          // Add small random offset for individual properties
          const offsetX = (Math.random() - 0.5) * 8;
          const offsetY = (Math.random() - 0.5) * 8;
          
          const isSelected = selectedProperty?.id === property.id;
          const isHovered = hoveredProperty?.id === property.id;
          
          return (
            <div
              key={`property-${property.id}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-15"
              style={{ 
                left: `${Math.max(2, Math.min(98, x + offsetX))}%`, 
                top: `${Math.max(2, Math.min(98, y + offsetY))}%` 
              }}
              onClick={() => handlePropertyClick(property)}
              onMouseEnter={() => setHoveredProperty(property)}
              onMouseLeave={() => setHoveredProperty(null)}
            >
              <div className={`relative ${isSelected || isHovered ? 'z-30' : 'z-20'}`}>
                <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all hover:scale-125 ${
                  isSelected 
                    ? 'bg-yellow-500 animate-bounce scale-125' 
                    : property.price >= 20000000
                    ? 'bg-purple-500 hover:bg-purple-600'
                    : property.price >= 15000000
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                }`}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs">
                    🏠
                  </div>
                </div>
                
                {/* Property Info Popup */}
                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all ${
                  isSelected || isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <div className="bg-white rounded-lg shadow-xl p-3 min-w-48 border max-w-xs">
                    <div className="text-xs font-semibold text-gray-900 mb-1 truncate">
                      {property.title}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{property.location}</div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-bold text-primary-600">
                        {formatPrice(property.price)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {property.bedrooms} BHK
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                        {property.propertyType}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded capitalize">
                        {property.possession}
                      </span>
                    </div>
                    <Link 
                      to={`/property/${property.id}`}
                      className="block w-full bg-primary-500 text-white text-xs text-center py-1 rounded hover:bg-primary-600 transition"
                    >
                      View Details
                    </Link>
                  </div>
                  <div className="w-3 h-3 bg-white transform rotate-45 mx-auto -mt-1.5 border-r border-b border-gray-200"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button
            onClick={() => {
              setMapCenter({ lat: 20.5937, lng: 78.9629 }); // Center of India
              setZoom(6);
            }}
            className="px-3 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition text-sm font-medium"
          >
            🇮🇳 India View
          </button>
          <button
            onClick={() => {
              setMapCenter({ lat: 19.0760, lng: 72.8777 }); // Mumbai
              setZoom(10);
            }}
            className="px-3 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition text-sm font-medium"
          >
            🏢 Mumbai
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-20 max-w-xs">
          <div className="text-xs font-semibold text-gray-900 mb-3">Map Legend</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full border border-white"></div>
              <span>Properties under ₹1.5Cr</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full border border-white"></div>
              <span>Properties ₹1.5-2Cr</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full border border-white"></div>
              <span>Premium ₹2Cr+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full border border-white"></div>
              <span>Selected Property</span>
            </div>
          </div>
        </div>

        {/* Property Count by City */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-20 max-w-xs">
          <div className="text-xs font-semibold text-gray-900 mb-3">Properties by City</div>
          <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
            {Object.entries(cityStats)
              .sort(([,a], [,b]) => b.count - a.count)
              .map(([city, stats]) => (
                <div 
                  key={city} 
                  className="flex justify-between items-center hover:bg-gray-50 p-1 rounded cursor-pointer"
                  onClick={() => handleCityClick(city)}
                >
                  <span className="font-medium">{city}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{stats.count}</span>
                    <div className={`w-3 h-3 rounded-full ${
                      stats.count > 2 ? 'bg-red-500' : stats.count > 1 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Map Attribution */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
          Interactive Map • Zoom: {zoom}x • {properties.length} Properties
        </div>
      </div>
    </div>
  );
};

export default MapView;

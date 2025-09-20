// src/components/PropertyDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PropertyDetailPage = () => {
  const { id } = useParams();
  
  // Same properties data as ListingPage (यहाँ same data होना चाहिए)
  const allProperties = [
    {
      id: 1,
      title: "Sea View Luxury Apartment",
      price: 25000000, // ₹2.5 Crore
      rating: 4.8,
      location: "Mumbai",
      address: "Bandra West, Mumbai, Maharashtra 400050",
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      area: 1200,
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Premium 3BHK apartment with stunning sea views in Bandra West, Mumbai's most sought-after location. This luxurious residence features modern amenities, spacious rooms, and unparalleled connectivity to business districts. Perfect for families looking for luxury living with panoramic views of the Arabian Sea.",
      coordinates: {
        lat: 19.0596,
        lng: 72.8295
      }
    },
    {
      id: 2,
      title: "Modern Villa in DLF City",
      price: 32000000, // ₹3.2 Crore
      rating: 4.9,
      location: "Gurgaon",
      address: "DLF Phase 2, Gurgaon, Haryana 122002",
      bedrooms: 4,
      bathrooms: 4,
      garages: 3,
      area: 2500,
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Spacious 4BHK independent villa with private garden in DLF Phase 2, perfect for families. This property offers world-class amenities, excellent connectivity to cyber city, and premium security features with modern architecture and luxurious interiors.",
      coordinates: {
        lat: 28.4595,
        lng: 77.0266
      }
    },
    {
      id: 3,
      title: "Tech Hub Premium Apartment",
      price: 18000000, // ₹1.8 Crore
      rating: 4.7,
      location: "Bangalore",
      address: "Electronic City, Bangalore, Karnataka 560100",
      bedrooms: 3,
      bathrooms: 2,
      garages: 2,
      area: 1400,
      images: [
        "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Modern 3BHK apartment near Electronic City, perfect for IT professionals with world-class amenities. Features include gym, swimming pool, and 24/7 security. Close to major tech companies and excellent public transport connectivity.",
      coordinates: {
        lat: 12.8456,
        lng: 77.6603
      }
    },
    {
      id: 4,
      title: "Family Paradise in Hinjewadi",
      price: 12000000, // ₹1.2 Crore
      rating: 4.6,
      location: "Pune",
      address: "Hinjewadi Phase 1, Pune, Maharashtra 411057",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 980,
      images: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Cozy 2BHK apartment in gated community near IT parks with excellent connectivity and amenities. Perfect for young professionals and small families. Features modern kitchen, spacious bedrooms, and beautiful garden views.",
      coordinates: {
        lat: 18.5912,
        lng: 73.7389
      }
    },
    {
      id: 5,
      title: "Luxury Penthouse Hyderabad",
      price: 15000000, // ₹1.5 Crore
      rating: 4.8,
      location: "Hyderabad",
      address: "HITEC City, Hyderabad, Telangana 500081",
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      area: 1600,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Stunning penthouse in HITEC City with panoramic views and premium amenities. Features include private terrace, modern interiors, and proximity to major IT companies. Perfect for executives and families.",
      coordinates: {
        lat: 17.4485,
        lng: 78.3908
      }
    },
    {
      id: 6,
      title: "Heritage Villa Chennai",
      price: 22000000, // ₹2.2 Crore
      rating: 4.7,
      location: "Chennai",
      address: "Anna Nagar, Chennai, Tamil Nadu 600040",
      bedrooms: 4,
      bathrooms: 3,
      garages: 2,
      area: 2200,
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Beautiful heritage-style villa in Anna Nagar with traditional architecture and modern amenities. Features spacious rooms, beautiful gardens, and excellent connectivity to business districts and schools.",
      coordinates: {
        lat: 13.0827,
        lng: 80.2707
      }
    },
    {
      id: 7,
      title: "Smart Home in Noida",
      price: 9500000, // ₹95 Lakh
      rating: 4.5,
      location: "Noida",
      address: "Sector 62, Noida, Uttar Pradesh 201309",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 1100,
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Modern 2BHK smart home in Sector 62 with automated systems and premium facilities. Features include smart lighting, security systems, and proximity to metro station and shopping malls.",
      coordinates: {
        lat: 28.6139,
        lng: 77.2090
      }
    },
    {
      id: 8,
      title: "Riverside Apartment Kolkata",
      price: 8000000, // ₹80 Lakh
      rating: 4.4,
      location: "Kolkata",
      address: "Salt Lake City, Kolkata, West Bengal 700064",
      bedrooms: 3,
      bathrooms: 2,
      garages: 1,
      area: 1300,
      images: [
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Elegant 3BHK apartment near Hooghly River with traditional Bengali architecture. Features spacious rooms, beautiful balconies with river views, and excellent connectivity to business districts.",
      coordinates: {
        lat: 22.5726,
        lng: 88.3639
      }
    },
    {
      id: 9,
      title: "Garden Villa Ahmedabad",
      price: 14000000, // ₹1.4 Crore
      rating: 4.6,
      location: "Ahmedabad",
      address: "Satellite, Ahmedabad, Gujarat 380015",
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      area: 1800,
      images: [
        "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Spacious villa with lush garden in Satellite area, perfect for families who love nature. Features include private garden, modern amenities, and excellent schools nearby.",
      coordinates: {
        lat: 23.0225,
        lng: 72.5714
      }
    },
    {
      id: 10,
      title: "Lake View Apartment Bhopal",
      price: 6500000, // ₹65 Lakh
      rating: 4.3,
      location: "Bhopal",
      address: "New Market, Bhopal, Madhya Pradesh 462001",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 950,
      images: [
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Beautiful 2BHK apartment overlooking Upper Lake with serene environment and modern amenities. Perfect for those seeking peaceful living with city conveniences nearby.",
      coordinates: {
        lat: 23.2599,
        lng: 77.4126
      }
    },
    {
      id: 11,
      title: "Hill Station Cottage Shimla",
      price: 11000000, // ₹1.1 Crore
      rating: 4.8,
      location: "Shimla",
      address: "The Mall Road, Shimla, Himachal Pradesh 171001",
      bedrooms: 3,
      bathrooms: 2,
      garages: 1,
      area: 1500,
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Charming cottage in the hills with mountain views and cozy fireplace, perfect for peaceful living. Features traditional hill architecture with modern amenities and beautiful valley views.",
      coordinates: {
        lat: 31.1048,
        lng: 77.1734
      }
    },
    {
      id: 12,
      title: "Beach House Goa",
      price: 16000000, // ₹1.6 Crore
      rating: 4.9,
      location: "Goa",
      address: "Calangute Beach Road, Goa 403516",
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      area: 1200,
      images: [
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Stunning beach house near Calangute with direct beach access and Portuguese architecture. Perfect for vacation home or rental investment. Features ocean views and tropical gardens.",
      coordinates: {
        lat: 15.2993,
        lng: 74.1240
      }
    }
  ];

  // Find property based on ID
  const property = allProperties.find(prop => prop.id === parseInt(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  // If property not found, show error
  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link to="/listing" className="bg-primary-500 text-white px-6 py-3 rounded-lg">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Visit booked successfully for ${property.title}! We will contact you soon.`);
    setShowBookingModal(false);
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: ''
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  // Function to get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
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
    <div className="min-h-screen bg-white">
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
          
          <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition text-lg font-medium flex items-center gap-2">
            <span>👤</span>
            Log In
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Property Details */}
          <div>
            {/* Property Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg"
                >
                  <span className="text-xl">←</span>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg"
                >
                  <span className="text-xl">→</span>
                </button>

                {/* Heart Icon */}
                <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg">
                  <span className="text-xl">❤️</span>
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-6 left-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <span>📍</span>
                <span>{property.address}</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold capitalize">
                    {property.location}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold">{property.rating}</span>
                    <div className="flex text-yellow-400">
                      {'⭐'.repeat(Math.floor(property.rating))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div className="flex items-center gap-8 text-lg text-gray-600 mb-8 bg-gray-50 p-6 rounded-xl">
                <span className="flex items-center gap-2">
                  🏠 <strong>{property.bedrooms} BHK</strong>
                </span>
                <span className="flex items-center gap-2">
                  🛁 <strong>{property.bathrooms}</strong>
                </span>
                <span className="flex items-center gap-2">
                  🚗 <strong>{property.garages}</strong>
                </span>
                <span className="flex items-center gap-2">
                  📐 <strong>{property.area} sq ft</strong>
                </span>
              </div>

              {/* Property Details Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
                
                {/* Additional Info */}
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Property Type</h4>
                    <p className="text-blue-700">
                      {property.bedrooms > 3 ? 'Villa/Independent House' : 'Apartment'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Possession</h4>
                    <p className="text-green-700">Ready to Move</p>
                  </div>
                </div>
              </div>

              {/* Book Visit Button */}
              <button 
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-gray-900 text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
              >
                Book the visit
              </button>
            </div>
          </div>

          {/* Right Side - Enhanced Map */}
          <div className="lg:sticky lg:top-8">
            <div className="h-96 lg:h-[600px] bg-gray-200 rounded-2xl overflow-hidden relative">
              {/* Enhanced Map Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 relative">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-8 h-full">
                    {Array.from({length: 64}).map((_, i) => (
                      <div key={i} className="border border-gray-300"></div>
                    ))}
                  </div>
                </div>
                
                {/* Location Info Card */}
                <div className="absolute top-6 left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
                  <h3 className="font-bold text-gray-900 mb-2">{property.location}</h3>
                  <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                  <div className="text-xs text-gray-500">
                    <p>Lat: {property.coordinates.lat}</p>
                    <p>Lng: {property.coordinates.lng}</p>
                  </div>
                </div>

                {/* Property Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                    <div className="absolute -top-10 -left-12 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {property.title}
                    </div>
                  </div>
                </div>

                {/* Nearby Landmarks */}
                <div className="absolute bottom-20 left-10">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  <span className="absolute -top-6 -left-8 text-xs text-blue-700 font-medium">
                    Shopping Mall
                  </span>
                </div>
                
                <div className="absolute top-20 right-20">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  <span className="absolute -top-6 -left-6 text-xs text-green-700 font-medium">
                    Metro Station
                  </span>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition font-bold">
                    +
                  </button>
                  <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition font-bold">
                    −
                  </button>
                </div>

                {/* Map Attribution */}
                <div className="absolute bottom-4 right-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  Interactive Map View
                </div>
              </div>
            </div>

            {/* Nearby Amenities */}
            <div className="mt-6 bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4">Nearby Amenities</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    🏥 <span>Hospital</span>
                  </span>
                  <span className="text-gray-600">2.5 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    🏫 <span>School</span>
                  </span>
                  <span className="text-gray-600">1.8 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    🛒 <span>Shopping Mall</span>
                  </span>
                  <span className="text-gray-600">3.2 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    🚇 <span>Metro Station</span>
                  </span>
                  <span className="text-gray-600">1.5 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Book a Visit</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
              >
                ✕
              </button>
            </div>

            {/* Property Summary in Modal */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-900">{property.title}</h4>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-lg font-bold text-primary-600">{formatPrice(property.price)}</p>
            </div>
            
            <form onSubmit={handleBookingSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      min={getMinDate()}
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                    <select
                      required
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    rows="3"
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Any special requirements or questions..."
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;

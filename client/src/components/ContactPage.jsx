// src/components/ContactPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: 'residential'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would submit to your backend API
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: 'residential'
      });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
            <Link to="/listing" className="text-gray-700 hover:text-primary-600 font-medium">Listing</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium border-b-2 border-primary-500 pb-1">Contact</Link>
            <a href="/add-property" className="text-gray-700 hover:text-primary-600 font-medium">Add Property</a>
          </div>
          
          <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition text-lg font-medium">
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-2xl mx-auto">
            Ready to find your dream property? Our expert team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
              <span>📞</span>
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
              <span>✉️</span>
              <span>hello@saarthi.com</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Property Interest</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="rental">Rental</option>
                        <option value="investment">Investment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                      placeholder="Tell us about your property requirements, budget, preferred location, or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-green-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-primary-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Office Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Office</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Main Office</h3>
                    <p className="text-gray-600">
                      123 Business District, Bandra Kurla Complex<br />
                      Mumbai, Maharashtra 400051
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone Numbers</h3>
                    <p className="text-gray-600">
                      Main: +91 98765 43210<br />
                      Support: +91 98765 43211
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Addresses</h3>
                    <p className="text-gray-600">
                      General: hello@saarthi.com<br />
                      Support: support@saarthi.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                    <p className="text-gray-600">
                      Mon - Fri: 9:00 AM - 7:00 PM<br />
                      Sat - Sun: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition flex items-center justify-center">
                    📘
                  </button>
                  <button className="w-12 h-12 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition flex items-center justify-center">
                    📷
                  </button>
                  <button className="w-12 h-12 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition flex items-center justify-center">
                    🐦
                  </button>
                  <button className="w-12 h-12 bg-red-500 text-white rounded-xl hover:bg-red-600 transition flex items-center justify-center">
                    📺
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Find Us Here</h3>
                <p className="text-gray-600">Located in the heart of Mumbai's business district</p>
              </div>
              
              <div className="h-96 relative">
                {/* Enhanced Map Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 relative">
                  {/* Map Grid */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-10 grid-rows-8 h-full">
                      {Array.from({length: 80}).map((_, i) => (
                        <div key={i} className="border border-gray-300"></div>
                      ))}
                    </div>
                  </div>

                  {/* Office Location */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-bounce"></div>
                      <div className="absolute -top-12 -left-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                        Saarthi Office
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Landmarks */}
                  <div className="absolute bottom-20 left-10">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                    <span className="absolute -top-6 -left-8 text-xs text-blue-700 font-medium">BKC Metro</span>
                  </div>
                  
                  <div className="absolute top-20 right-20">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    <span className="absolute -top-6 -left-6 text-xs text-green-700 font-medium">Mall</span>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition font-bold text-gray-700">
                      +
                    </button>
                    <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition font-bold text-gray-700">
                      −
                    </button>
                  </div>

                  {/* Map Type Selector */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <button className="bg-white px-3 py-1 rounded text-xs shadow hover:bg-gray-50 transition">
                      Map
                    </button>
                    <button className="bg-white px-3 py-1 rounded text-xs shadow hover:bg-gray-50 transition">
                      Satellite
                    </button>
                  </div>

                  {/* Get Directions Button */}
                  <div className="absolute bottom-4 right-4">
                    <button className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Saarthi?</h2>
            <p className="text-xl text-gray-300">Trusted by thousands of families across India</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">50k+</div>
              <div className="text-gray-300">Happy Families</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">25+</div>
              <div className="text-gray-300">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">1L+</div>
              <div className="text-gray-300">Properties Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get quick answers to common questions</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do I book a property visit?",
                answer: "You can book a visit through our property detail pages, contact form, or by calling us directly. We'll arrange a convenient time for you."
              },
              {
                question: "Do you charge any brokerage fees?",
                answer: "No, we offer zero brokerage services for buyers. Our revenue comes from partnerships with developers and property owners."
              },
              {
                question: "Which cities do you cover?",
                answer: "We currently operate in 25+ major Indian cities including Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, and more."
              },
              {
                question: "How can I list my property?",
                answer: "You can list your property by filling out our 'Add Property' form or contacting our team directly. We'll help you with documentation and marketing."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

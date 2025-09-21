import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const ContactPage = () => {
  const { user, isAuthenticated, trackInteraction } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    subject: '',
    message: '',
    propertyInterest: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isAuthenticated) {
        trackInteraction('contact_form_submit', {
          subject: formData.subject,
          propertyInterest: formData.propertyInterest
        });
      }
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. Our team will get back to you within 24 hours.
          </p>
          <div className="flex gap-4">
            <Link to="/" className="btn-primary flex-1">
              Back to Home
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-secondary flex-1"
            >
              Send Another
            </button>
          </div>
        </div>
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
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium border-b-2 border-primary-500 pb-1">Contact</Link>
            <Link to="/add-property" className="text-gray-700 hover:text-primary-600 font-medium">Add Property</Link>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition text-lg font-medium"
            >
              Log In
            </button>
          )}
        </div>
      </nav>

      {/* Header Section */}
      <section className="py-16">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch With Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our properties? Need expert advice? Our team is here to help you find your dream home.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select a subject</option>
                  <option value="buying">I want to buy a property</option>
                  <option value="selling">I want to sell my property</option>
                  <option value="renting">I'm looking for rental</option>
                  <option value="investment">Investment opportunities</option>
                  <option value="consultation">Property consultation</option>
                  <option value="support">General support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Interest (Optional)
                </label>
                <select
                  name="propertyInterest"
                  value={formData.propertyInterest}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select property type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">Independent House</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plot/Land</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="form-input resize-none"
                  placeholder="Tell us about your requirements, budget, preferred location, or any specific questions you have..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="loading w-5 h-5"></div>
                    Sending Message...
                  </div>
                ) : (
                  '📤 Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Our Office</h4>
                    <p className="text-gray-600">
                      123 Real Estate Plaza, Bandra Kurla Complex<br />
                      Mumbai, Maharashtra 400051<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone Numbers</h4>
                    <p className="text-gray-600">
                      <a href="tel:+919876543210" className="hover:text-primary-600 transition">
                        +91 98765 43210
                      </a><br />
                      <a href="tel:+912261234567" className="hover:text-primary-600 transition">
                        +91 22 6123 4567
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Addresses</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@saarthi.com" className="hover:text-primary-600 transition">
                        info@saarthi.com
                      </a><br />
                      <a href="mailto:support@saarthi.com" className="hover:text-primary-600 transition">
                        support@saarthi.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🕒</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h3>
              
              <div className="space-y-4">
                <a
                  href="https://wa.me/919876543210"
                  className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                    <p className="text-gray-600 text-sm">Chat with us instantly</p>
                  </div>
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Call Now</h4>
                    <p className="text-gray-600 text-sm">Speak with our experts</p>
                  </div>
                </a>

                <button
                  onClick={() => window.open('https://calendly.com/saarthi-realestate', '_blank')}
                  className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition w-full text-left"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📅</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Schedule Meeting</h4>
                    <p className="text-gray-600 text-sm">Book a consultation</p>
                  </div>
                </button>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <details className="border-b border-gray-200 pb-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer hover:text-primary-600 transition">
                    Do you charge any brokerage fees?
                  </summary>
                  <p className="text-gray-600 mt-2 text-sm">
                    No, we offer zero brokerage services for property buyers. Our revenue comes from verified listing partnerships.
                  </p>
                </details>

                <details className="border-b border-gray-200 pb-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer hover:text-primary-600 transition">
                    How do you verify properties?
                  </summary>
                  <p className="text-gray-600 mt-2 text-sm">
                    All properties are RERA verified with complete documentation including title deeds, approvals, and legal clearances.
                  </p>
                </details>

                <details className="border-b border-gray-200 pb-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer hover:text-primary-600 transition">
                    Can you help with home loans?
                  </summary>
                  <p className="text-gray-600 mt-2 text-sm">
                    Yes, we have partnerships with leading banks and can help you get pre-approved loans at competitive rates.
                  </p>
                </details>

                <details className="pb-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer hover:text-primary-600 transition">
                    Do you provide property management services?
                  </summary>
                  <p className="text-gray-600 mt-2 text-sm">
                    Yes, we offer comprehensive property management including tenant finding, rent collection, and maintenance.
                  </p>
                </details>
              </div>
            </div>
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

export default ContactPage;

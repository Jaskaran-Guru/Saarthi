import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, trackInteraction } = useAuth();
  const [loginMethod, setLoginMethod] = useState('google');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // In real app, this would redirect to Google OAuth
      window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/google`;
      
      trackInteraction('google_login_attempt');
    } catch (error) {
      console.error('Google login error:', error);
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate email login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const mockUser = {
        id: 1,
        name: 'Demo User',
        email: formData.email,
        avatar: null
      };
      
      login(mockUser);
      trackInteraction('email_login_success');
      onClose();
    } catch (error) {
      console.error('Email login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Login to access your account</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
          >
            ✕
          </button>
        </div>

        {/* Login Method Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLoginMethod('google')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
              loginMethod === 'google'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Google
          </button>
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
              loginMethod === 'email'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Email
          </button>
        </div>

        {loginMethod === 'google' ? (
          /* Google Login */
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="loading w-5 h-5"></div>
              ) : (
                <>
                  <img 
                    src="https://developers.google.com/identity/images/g-logo.png" 
                    alt="Google" 
                    className="w-5 h-5"
                  />
                  Continue with Google
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                By continuing, you agree to our{' '}
                <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        ) : (
          /* Email Login */
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-primary-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="loading w-5 h-5"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-primary-600 hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        )}

        {/* Features */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Why create an account?</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              Save favorite properties
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              Get personalized recommendations
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              Track your property searches
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              Connect with verified agents
            </div>
          </div>
        </div>
      </div>
      
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      ></div>
    </div>
  );
};

export default LoginModal;

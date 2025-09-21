import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // API URL with fallback
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // Debug log to check env vars
  useEffect(() => {
    console.log('🔧 Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      API_URL: process.env.REACT_APP_API_URL,
      GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing'
    });
  }, []);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 Checking auth status at:', `${API_BASE_URL}/auth/check`);
      
      const response = await fetch(`${API_BASE_URL}/auth/check`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      console.log('🔍 Auth check response:', data);
      
      if (data.success && data.isAuthenticated) {
        setUser(data.user);
        setIsAuthenticated(true);
        console.log('✅ User authenticated:', data.user.name);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log('❌ User not authenticated');
      }
    } catch (error) {
      console.error('❌ Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Google login - redirect to backend
  const loginWithGoogle = () => {
    console.log('🚀 Starting Google login...');
    
    // Store current page to redirect back after login
    const currentPath = window.location.pathname;
    localStorage.setItem('redirectAfterLogin', currentPath);
    
    // Build Google OAuth URL
    const googleAuthURL = `${API_BASE_URL}/auth/google`;
    console.log('🔗 Redirecting to:', googleAuthURL);
    
    // Redirect to backend Google OAuth
    window.location.href = googleAuthURL;
  };

  // Logout function
  const logout = async () => {
    try {
      console.log('👋 Logging out...');
      
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      console.log('👋 Logout response:', data);

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        console.log('✅ Logged out successfully');
        
        // Redirect to home page
        window.location.href = '/';
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Force logout on error
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/';
    }
  };

  // Handle successful login (called from URL params)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.get('login');
    
    if (loginSuccess === 'success') {
      console.log('🎉 Login successful! Refreshing auth status...');
      
      // Remove URL params
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Refresh auth status
      setTimeout(() => {
        checkAuthStatus();
      }, 1000);
      
      // Redirect to original page if stored
      const redirectPath = localStorage.getItem('redirectAfterLogin');
      if (redirectPath && redirectPath !== '/') {
        setTimeout(() => {
          window.location.href = redirectPath;
          localStorage.removeItem('redirectAfterLogin');
        }, 2000);
      }
    }
    
    // Handle login error
    const loginError = urlParams.get('error');
    if (loginError === 'auth_failed') {
      console.error('❌ Google authentication failed');
      alert('Google login failed. Please try again.');
      
      // Remove URL params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Track user interactions (optional)
  const trackInteraction = async (action, details = {}) => {
    if (!isAuthenticated) return;
    
    try {
      await fetch(`${API_BASE_URL}/interactions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          details: {
            ...details,
            timestamp: new Date().toISOString(),
            url: window.location.href
          }
        })
      });
    } catch (error) {
      // Silently fail for analytics
      console.warn('📊 Track interaction failed:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    loginWithGoogle,
    logout,
    trackInteraction,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

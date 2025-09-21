import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import './index.css';

import HomePage from './components/HomePage';
import ListingPage from './components/ListingPage';
import PropertyDetailPage from './components/PropertyDetailPage';
import ContactPage from './components/ContactPage';
import AddPropertyPage from './components/AddPropertyPage';
import FavoritesPage from './components/FavoritesPage';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listing" element={<ListingPage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/add-property" element={<AddPropertyPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;

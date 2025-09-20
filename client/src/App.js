// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './components/HomePage';
import ListingPage from './components/ListingPage';
import PropertyDetailPage from './components/PropertyDetailPage';
import ContactPage from './components/ContactPage';
import AddPropertyPage from './components/AddPropertyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/add-property" element={<AddPropertyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

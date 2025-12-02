// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import HomePage from './components/HomePage.jsx'; 
import CatalogPage from './components/CatalogPage.jsx'; 
import FarmDetailsPage from './components/FarmDetailsPage.jsx'; 
import About from './components/About.jsx'; 
import Cart from './components/Cart.jsx'; 

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <div className="content-wrap">
                    <Routes>
                        <Route path="/" element={<HomePage />} /> 
                        <Route path="/catalog" element={<CatalogPage />} /> 
                        <Route path="/farm/:id" element={<FarmDetailsPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
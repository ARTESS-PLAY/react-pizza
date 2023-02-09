import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SearchContext from './context/SearchContext';

import Home from './Pages/Home';
import Header from './components/Header/Index';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';
import PizzaPage from './Pages/PizzaPage';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pizza/:id" element={<PizzaPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;

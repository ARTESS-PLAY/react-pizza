import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SearchContext from './context/SearchContext';

import Home from './Pages/Home';
import Header from './components/Header/Index';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';

function App() {
    const [search, setSearch] = React.useState('');
    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ search, setSearch }}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home search={search} />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;

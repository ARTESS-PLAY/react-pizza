import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Header from './components/Header/Index';
import NotFound from './Pages/NotFound';
import Cart from './Pages/Cart';

function App() {
    const [search, setSearch] = React.useState('');
    return (
        <div className="wrapper">
            <Header search={search} setSearch={setSearch} />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home search={search} />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;

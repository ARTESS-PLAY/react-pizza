import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Header from './components/Header/Index';

const NotFound = React.lazy(() => import(/*webpachChunkName: "NotFound" */ './Pages/NotFound'));
const Cart = React.lazy(() => import(/*webpachChunkName: "Cart" */ './Pages/Cart'));
const PizzaPage = React.lazy(() => import(/*webpachChunkName: "PizzaPage" */ './Pages/PizzaPage'));

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Suspense fallback={<h2>Идёт загрузка...</h2>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/pizza/:id" element={<PizzaPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default App;

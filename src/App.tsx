import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Home from './Pages/Home';
import Header from './components/Header/Index';
import { isMobileT } from './utils/sreenResolution/typesDevice';

const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound" */ './Pages/NotFound'));
const Cart = React.lazy(() => import(/*webpackChunkName: "Cart" */ './Pages/Cart'));
const PizzaPage = React.lazy(() => import(/*webpackChunkName: "PizzaPage" */ './Pages/PizzaPage'));
const MobileMenu = React.lazy(
    () => import(/*webpackChunkName: "MobileMenu" */ './components/Mobile/MobileMenu'),
);

function App() {
    const isMobile = useMediaQuery(isMobileT);
    console.log(isMobile);
    return (
        <div className="wrapper">
            <Suspense fallback={<h2>Идёт загрузка...</h2>}>
                <Header />
                {isMobile && <MobileMenu />}
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/pizza/:id" element={<PizzaPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Suspense>
        </div>
    );
}

export default App;

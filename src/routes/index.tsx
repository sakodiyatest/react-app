import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../layout/Header/Header';
import Home from '../pages/home';
import ProductDetail from '../pages/product-detail';
import EditProductDetail from '../pages/edit-product-detail';

import { EDIT_PRODUCT_PATH, HOME_PATH, PRODUCT_PATH } from './routesPath';

import NotFound from '../ui-kit/NotFound/NotFound';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={PRODUCT_PATH} element={<ProductDetail />} />
            <Route path={EDIT_PRODUCT_PATH} element={<EditProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;

import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SplashPage from './components/SplashPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import * as sessionActions from './store/session';
import * as productActions from './store/products';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const productsObj = useSelector((state) => {return state.products.entries});

  useEffect(() => {
    dispatch(productActions.getAllProducts());
    dispatch(sessionActions.restore()).then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route exact path='/products'>
            <div id='productlist-warrior-mouse'>
              <div id='product-list-div'>
                <ProductList />
              </div>
              <div id='warrior-mouse-div'>
                <img src='https://res.cloudinary.com/tabletopquest/image/upload/v1641948485/products/vector-pixel-art-isolated-cartoon-vector-id1005900692_pmfe7e.jpg' alt='warrior-mouse' />
                <h3>Good luck on your quest!</h3>
              </div>
            </div>
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/products/new'>
            <ProductForm type='create' />
          </Route>
          <Route path='/products/:id/edit'>
            <ProductForm type='update' productsObj={productsObj}/>
          </Route>
          <Route>
            <div id='page-not-found'>
              <h3>404: Page Not Found</h3>
            </div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

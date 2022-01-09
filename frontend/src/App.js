import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import * as sessionActions from './store/session';
// import * as productActions from './store/products';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restore()).then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <ProductList />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/products/new'>
            <ProductForm />
          </Route>
          <Route>
            Not Found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

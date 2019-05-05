/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages.
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Draft from '../Draft'; 
// import ProductListing from '../ProductListing'; 
import NotFoundPage from '../NotFoundPage'; 

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Draft} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

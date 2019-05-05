/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

import productListingReducer from './containers/ProductListing/reducer';

/**
 * Merges the main reducer with the router state and other reducers
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    productListingReducer
  });

  return rootReducer;
}

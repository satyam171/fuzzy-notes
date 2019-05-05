import { all } from 'redux-saga/effects';

// import all your sagas here 
import intiateProductFetch from './containers/ProductListing/saga'; 

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
      intiateProductFetch()
    ])
  }
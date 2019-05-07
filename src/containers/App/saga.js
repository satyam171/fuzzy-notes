/**
 * Gets the notes from the dummy api
 */
 
import _ from 'lodash';  
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_NOTES } from './constants';
import { searchNotesSuccess, searchNotesError } from './actions';

import request from '../../utils/request';

/**
 * Products request/response handler
 */

export function* fetchNotes() {

  const requestURL = `http://localhost:8000/notes`;

  try {
    // Call our request helper (see 'utils/request')
    let notes = yield call(request, requestURL);
    // Checking for the empty object value, passing an empty array by default 
    if(_.isEmpty(notes)) notes = [];
    yield put(searchNotesSuccess(notes));
  } catch (err) {
    yield put(searchNotesError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* intiateNotesFetch() {
  // Watches for GET_NOTES actions and calls fetchProducts when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_NOTES, fetchNotes);
}
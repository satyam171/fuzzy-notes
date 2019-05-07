/**
 * Gets the notes from the dummy api
 */
 
import _ from 'lodash';  
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_NOTES, ADD_NOTE, DELETE_NOTE } from './constants';
import { searchNotes, searchNotesSuccess, searchNotesError } from './actions';

import request from '../../utils/request';



/**
 * Add Note request/response handler
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
 * Delete Note request/response handler
 */

export function* addNote(action) {
  const requestURL = `http://localhost:8000/notes`;
  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify(action.note),
  };
  try {
    // Call our request helper (see 'utils/request')
    let addedNote = yield call(request, requestURL, options);
    // Make another request for getting all the notes 
    let notes = yield put(searchNotes());
    yield put(searchNotesSuccess(notes));
  } catch (err) {
    yield put(searchNotesError(err));
  }
}

export function* deleteNote(action) {
  const requestURL = `http://localhost:8000/notes/${action.id}`;
  const options = {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    let noteDeleted = yield call(request, requestURL, options);
    // Make another request for getting all the notes 
    let notes = yield put(searchNotes()); 
    yield put(searchNotesSuccess(notes));
  } catch (err) {
    yield put(searchNotesError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* intiateNotesFetch() {
  // Watches for GET_NOTES actions and calls fetchNotes
  yield takeLatest(GET_NOTES, fetchNotes);
  yield takeLatest(ADD_NOTE, addNote);
  yield takeLatest(DELETE_NOTE, deleteNote);
}
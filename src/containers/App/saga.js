/**
 * Gets the notes from the dummy api
 */
 
import _ from 'lodash';  
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_NOTES, ADD_NOTE, SAVE_NOTE, DELETE_NOTE } from './constants';
import { 
  searchNotes, 
  searchNotesSuccess, 
  searchNotesError,
  saveNoteSuccess,
  saveNoteError 
} from './actions';

import request from '../../utils/request';

/**
 * Add Note request/response handler
 */

export function* fetchNotes(action) {
  /**
   * If a falsy value '' comes in text, then all the notes will be searched,
   * otherwise all the notes will be searched
   */
  const {text} = action; 
  const specificNote = text ? `/${text}` : '';
  const requestURL = `https://notes-json-server.herokuapp.com/notes${specificNote}`;
  try {
    // Call our request helper (see 'utils/request')
    let notes = yield call(request, requestURL);
    // Checking for the empty object value, passing an empty array by default 
    if(_.isEmpty(notes)) notes = [];
    // Checking for the condition if only one note was searched
    if(text) yield put(searchNotesSuccess([{...notes, index : 0}]));
    else{
      notes = notes.map((item, index)=>{
        item.index = index; 
        return item; 
      })
      yield put(searchNotesSuccess(notes));
    } 
  } catch (err) {
    yield put(searchNotesError(err));
  }
}

/**
 * Add Note request/response handler
 */

export function* addNote(action) {
  const requestURL = `https://notes-json-server.herokuapp.com/notes`;
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
    yield call(request, requestURL, options);
    // Make another request for getting all the notes 
    yield put(searchNotes());
  } catch (err) {
    yield put(searchNotesError(err));
  }
}
/**
 * Save Note request/response handler
 */

export function* saveNote(action) {
  let {selected : {keys, index}, notes} = action; 
  const requestURL = `https://notes-json-server.herokuapp.com/notes/${Number(keys[0])}`;
  const options = {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify(notes[index]),
  };
  try {
    // Call our request helper (see 'utils/request')
    let savedNote = yield call(request, requestURL, options);
    notes[index] = savedNote; 
    // Make another request for getting all the notes 
    yield put(saveNoteSuccess(notes));
  } catch (err) {
    yield put(saveNoteError(err));
  }
}

/**
 * Delete Note request/response handler
 */

export function* deleteNote(action) {
  const requestURL = `https://notes-json-server.herokuapp.com/notes/${action.id}`;
  const options = {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, options);
    // Make another request for getting all the notes 
    yield put(searchNotes()); 
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
  yield takeLatest(SAVE_NOTE, saveNote);
  yield takeLatest(DELETE_NOTE, deleteNote);
}
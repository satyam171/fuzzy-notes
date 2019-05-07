/*
 *
 * App actions
 *
 */

import { 
  GET_NOTES, 
  GET_NOTES_SUCCESS, 
  GET_NOTES_ERROR, 
  ADD_NOTE, 
  DELETE_NOTE, 
  CHANGE_SELECTED_KEY } from './constants';

/**
 * Load the notes, this action starts the request saga
 * 
 * @param {string} containing the search text
 * 
 * @return {object} An action object with a type of GET_NOTES
 */
export function searchNotes(text) {
  return {
    type: GET_NOTES,
    text
  };
}

/**
 * Dispatched when the notes are loaded by the request saga
 *
 * @param  {array} notes The notes that were returned
 * 
 * @return {object} An action object with a type of GET_NOTES_SUCCESS passing the notes
 */
export function searchNotesSuccess(notes) {
  return {
    type: GET_NOTES_SUCCESS,
    notes
  };
}

/**
 * Dispatched when loading the notes fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_NOTES_ERROR passing the error
 */
export function searchNotesError(error) {
  return {
    type: GET_NOTES_ERROR,
    error
  };
}

/**
 * Change the selected key 
 * 
 * @param [array] containing the new selected keys
 * 
 * @return {object} An action object with a type of CHANGE_SELECTED_KEY and the new selectedKeys
 */
export function changeSelectedKey(selectedKeys) {
  return {
    type: CHANGE_SELECTED_KEY,
    selectedKeys
  };
}

/**
 * Add Note Actions ########################################
 */

 /**
 * Add the note, this action starts the request saga
 * 
 * @param  {object} note Contains the empty state of the note
 * 
 * @return {object} An action object with a type of ADD_NOTE along with the note
 */
export function addNote(note) {
  return {
    type: ADD_NOTE,
    note
  };
}

/**
 * Delete Note Actions ########################################
 */

 /**
 * Delete the note, this action starts the request saga
 * 
 * @param  {object} note Contains the id of the note
 * 
 * @return {object} An action object with a type of DELETE_NOTE along with the id
 */
export function deleteNote(id) {
  return {
    type: DELETE_NOTE,
    id
  };
}

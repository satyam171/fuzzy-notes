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
  SAVE_NOTE, 
  SAVE_NOTE_SUCCESS, 
  SAVE_NOTE_ERROR, 
  DELETE_NOTE, 
  CHANGE_SELECTED_KEY,
  CHANGE_EDITOR_STATE
} from './constants';

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
 * Save Note Actions ########################################
 */

 /**
 * Save the note, this action starts the request saga
 * 
 * @param  {object} note Contains the notes array
 * @param {string} id Containing the selected state of the note
 * 
 * @return {object} An action object with a type of SAVE_NOTE along with the notes
 */
export function saveNote(notes, selected) {
  return {
    type: SAVE_NOTE,
    notes,
    selected
  };
}

/**
 * Dispatched when the note is updated successfully
 *
 * @param  {array} notes The updates notes array
 * 
 * @return {object} An action object with a type of SAVE_NOTE_SUCCESS passing the updated notes
 */
export function saveNoteSuccess(notes) {
  return {
    type: SAVE_NOTE_SUCCESS,
    notes
  };
}

/**
 * Dispatched when saving the note fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of SAVE_NOTE_ERROR passing the error
 */
export function saveNoteError(error) {
  return {
    type: SAVE_NOTE_ERROR,
    error
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

/**
 * Other utility functions ###################
 */

/**
 * Change the selected key 
 * 
 * @param {array} containing the new selected keys
 * @param {index} containing the selected index
 * 
 * @return {object} An action object with a type of CHANGE_SELECTED_KEY and the new selectedKeys and index
 */
export function changeSelected(selectedKeys, index) {
  return {
    type: CHANGE_SELECTED_KEY,
    selectedKeys,
    index
  };
}

/**
 * Change the editor state according to the key 
 * 
 * @param {object} containing the key and new editor state 
 * 
 * @return {object} An action object with a type of CHANGE_EDITOR_STATE and the update obj
 * containing the key and new editor state
 */
export function changeEditorState(updateObj) {
  return {
    type: CHANGE_EDITOR_STATE,
    updateObj
  };
}
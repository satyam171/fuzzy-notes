/*
 *
 * App actions
 *
 */

import { GET_NOTES, GET_NOTES_SUCCESS, GET_NOTES_ERROR } from './constants';

/**
 * Load the repositories, this action starts the request saga
 * 
 * @return {object} An action object with a type of GET_NOTES
 */
export function searchNotes() {
  return {
    type: GET_NOTES,
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
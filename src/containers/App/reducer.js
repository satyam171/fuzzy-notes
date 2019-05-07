/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { GET_NOTES_SUCCESS, GET_NOTES, GET_NOTES_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  notes: []
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_NOTES:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_NOTES_SUCCESS:
        draft.loading = false;
        draft.notes = action.notes;
        draft.error = false; 
        break;

      case GET_NOTES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default appReducer;

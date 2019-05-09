/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { 
  GET_NOTES_SUCCESS, 
  GET_NOTES, 
  GET_NOTES_ERROR,
  SAVE_NOTE, 
  SAVE_NOTE_SUCCESS, 
  SAVE_NOTE_ERROR,  
  ADD_NOTE, 
  DELETE_NOTE,
  CHANGE_SELECTED_KEY,
  CHANGE_EDITOR_STATE
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  notes: [],
  selected : {keys : [], index : 0},
  loadingSave : false, 
  errorSave : false
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
        draft.selected.keys = action.notes.length ? [`${action.notes[0].id}`] : [];
        draft.selected.index = 0;  
        draft.error = false; 
        break;

      case GET_NOTES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case SAVE_NOTE: 
        draft.loadingSave = true; 
        draft.errorSave = false; 
        break; 
        
      case SAVE_NOTE_SUCCESS: 
        draft.loadingSave = false; 
        draft.notes = action.notes; 
        draft.errorSave = false;
        break; 
      
      case SAVE_NOTE_ERROR: 
        draft.loadingSave = false; 
        draft.errorSave = action.error;
        break;   

      case ADD_NOTE: 
        draft.loading = true; 
        draft.error = false; 
        break; 
        
      case DELETE_NOTE: 
        draft.loading = true; 
        draft.error = false;
        break; 

      case CHANGE_SELECTED_KEY: 
        draft.selected.keys = action.selectedKeys; 
        draft.selected.index = action.index;  
        break;
        
      case CHANGE_EDITOR_STATE: 
        draft.notes = action.updateObj.notes;   
        break;  
    }
  });

export default appReducer;

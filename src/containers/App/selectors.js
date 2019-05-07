import { createSelector } from 'reselect';

const selectAppDomain = state => state.appReducer

const makeSelectLoading = () =>
  createSelector(
    selectAppDomain,
    appState => appState.loading,
  );

const makeSelectNotes = () =>
  createSelector(
    selectAppDomain,
    appState => appState.notes,
  );   

const makeSelectError = () =>
  createSelector(
    selectAppDomain,
    appState => appState.error,
  ); 

export { makeSelectLoading, makeSelectNotes, makeSelectError };

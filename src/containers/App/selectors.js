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

const makeSelectSelected = () =>
  createSelector(
    selectAppDomain,
    appState => appState.selected,
  );  

const makeSelectError = () =>
  createSelector(
    selectAppDomain,
    appState => appState.error,
  ); 

export { makeSelectLoading, makeSelectNotes, makeSelectError, makeSelectSelected };

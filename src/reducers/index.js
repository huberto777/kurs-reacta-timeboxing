import { currentTimeboxIdReducer } from './currentTimeboxIdReducer';
import timeboxesReducer, * as timeboxesSelectors from './timeboxesReducer';
import { currentlyEditedTimeboxIdReducer } from './currentlyEditedTimeboxIdReducer';
import { timeboxesAreLoadingReducer } from './timeboxesAreLoadingReducer';
import { timeboxesLoadingErrorReducer } from './timeboxesLoadingErrorReducer';
import { timeboxIsCreatingReducer } from './timeboxIsCreatingReducer';
import timeboxesSearchReducer from './timeboxesSearchReducer';

function rootReducer(state = {}, action) {
  return {
    currentTimeboxId: currentTimeboxIdReducer(state.currentTimeboxId, action),
    timeboxes: timeboxesReducer(state.timeboxes, action),
    timeboxIsCreating: timeboxIsCreatingReducer(state.timeboxIsCreating, action),
    currentlyEditedTimeboxId: currentlyEditedTimeboxIdReducer(
      state.currentlyEditedTimeboxId,
      action,
    ),
    timeboxesAreLoading: timeboxesAreLoadingReducer(state.timeboxesAreLoading, action),
    timeboxesLoadingError: timeboxesLoadingErrorReducer(state.timeboxesLoadingError, action),
    timeboxesSearch: timeboxesSearchReducer(state.timeboxesSearch, action),
  };
}

// selectors
export const getAllTimeboxes = (state) => timeboxesSelectors.getAllTimeboxes(state.timeboxes);

export const getRemainingTimeboxes = (state) =>
  !state.timeboxesSearch
    ? timeboxesSelectors.getRemainingTimeboxes(state.timeboxes)
    : state.timeboxes.filter(
        (timebox) =>
          timebox.title.toLowerCase().includes(state.timeboxesSearch) && timebox.finished === false,
      );
export const getTimeboxById = (state, timeboxId) =>
  timeboxesSelectors.getTimeboxById(state.timeboxes, timeboxId);

export const areTimeboxesLoading = (state) => state.timeboxesAreLoading;
export const getTimeboxesLoadingError = (state) => state.timeboxesLoadingError;
export const isTimeboxEdited = (state, timebox) =>
  state.currentlyEditedTimeboxId && state.currentlyEditedTimeboxId === timebox.id;
export const getCurrentlyEditedTimebox = (state) =>
  getTimeboxById(state, state.currentlyEditedTimeboxId);
export const isAnyTimeboxEdited = (state) => !!state.currentlyEditedTimeboxId;
export const isAnyTimeboxCurrent = (state) => !!state.currentTimeboxId;
export const getCurrentTimebox = (state) =>
  isAnyTimeboxCurrent(state) ? getTimeboxById(state, state.currentTimeboxId) : null;

export const getFinishedTimeboxes = (state) =>
  state.timeboxes.filter(
    (timebox) => timebox.finished === true && timebox.title.includes(state.timeboxesSearch),
  );
export const timeboxIsCreating = (state) => state.timeboxIsCreating;

export default rootReducer;

import TimeboxesAPI from './api/FakeTimeboxesApi';
import { isAnyTimeboxCurrent, getCurrentTimebox } from './reducers';
import * as types from './constants/types';

export const setTimeboxes = (timeboxes) => ({
  type: types.TIMEBOXES_SET,
  timeboxes,
});
export const addTimebox = (timebox) => ({ type: types.TIMEBOX_ADD, timebox });
export const replaceTimebox = (replacedTimebox) => ({
  type: types.TIMEBOX_REPLACE,
  replacedTimebox,
});
export const removeTimebox = (removedTimebox) => ({
  type: types.TIMEBOX_REMOVE,
  removedTimebox,
});
export const setError = (error) => ({ type: types.ERROR_SET, error });
export const disableLoadingIndicator = () => ({
  type: types.LOADING_INDICATOR_DISABLE,
});
export const stopEditingTimebox = () => ({ type: types.TIMEBOX_EDIT_STOP });
export const startEditingTimebox = (currentlyEditedTimeboxId) => ({
  type: types.TIMEBOX_EDIT_START,
  currentlyEditedTimeboxId,
});
export const makeTimeboxCurrent = (timebox) => ({
  type: types.TIMEBOX_MAKE_CURRENT,
  timebox,
});

export const finishCurrentTimebox = () => (dispatch, getState) => {
  //   if (isAnyTimeboxCurrent(getState())) {
  //     dispatch(removeTimebox(getCurrentTimebox(getState())));
  //   }
  if (isAnyTimeboxCurrent(getState())) {
    dispatch({
      type: types.CURRENT_TIMEBOX_FINISH,
      timebox: getCurrentTimebox(getState()),
    });
  }
};

export const stopCurrentTimebox = () => ({
  type: types.STOP_CURRENT_TIMEBOX,
});

export const searchInput = (e) => ({
  type: types.SEARCH_INPUT,
  payload: e.target.value.toLowerCase(),
});
export const setTimeboxCreating = () => ({
  type: types.SET_TIMEBOX_CREATING,
});
export const cancelTimeboxCreating = () => ({
  type: types.CANCEL_TIMEBOX_CREATING,
});

// redux-thunk
export const fetchAllTimeboxes = (accessToken) => (dispatch) => {
  TimeboxesAPI.getAllTimeboxes(accessToken)
    .then((timeboxes) => dispatch(setTimeboxes(timeboxes)))
    .catch((error) => dispatch(setError(error)))
    .finally(() => dispatch(disableLoadingIndicator()));
};
export const removeTimeboxRemotely = (timebox, accessToken) => (dispatch) => {
  TimeboxesAPI.removeTimebox(timebox, accessToken).then(() => dispatch(removeTimebox(timebox)));
};

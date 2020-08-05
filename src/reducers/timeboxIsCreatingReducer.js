import { SET_TIMEBOX_CREATING, CANCEL_TIMEBOX_CREATING } from '../constants/types';

export function timeboxIsCreatingReducer(state = false, action) {
  switch (action.type) {
    case SET_TIMEBOX_CREATING: {
      return true;
    }
    case CANCEL_TIMEBOX_CREATING: {
      return false;
    }
    default: {
      return state;
    }
  }
}

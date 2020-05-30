import { TIMEBOX_EDIT_STOP, TIMEBOX_EDIT_START } from "../constants/types";

export function currentlyEditedTimeboxIdReducer(state = null, action) {
  switch (action.type) {
    case TIMEBOX_EDIT_STOP: {
      return null;
    }
    case TIMEBOX_EDIT_START: {
      const { currentlyEditedTimeboxId } = action;
      return currentlyEditedTimeboxId;
    }
    default: {
      return state;
    }
  }
}

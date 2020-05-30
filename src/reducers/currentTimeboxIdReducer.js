import {
  TIMEBOX_MAKE_CURRENT,
  TIMEBOX_REMOVE,
  STOP_CURRENT_TIMEBOX,
  CURRENT_TIMEBOX_FINISH,
} from "../constants/types";

export function currentTimeboxIdReducer(state = null, action) {
  switch (action.type) {
    case TIMEBOX_MAKE_CURRENT: {
      const { timebox } = action;
      return timebox.id;
    }
    case TIMEBOX_REMOVE: {
      const { removedTimebox } = action;
      return state === removedTimebox.id ? null : state;
    }
    case STOP_CURRENT_TIMEBOX: {
      return { ...state, currentTimeboxId: null };
    }
    case CURRENT_TIMEBOX_FINISH: {
      const { timebox } = action;
      return {
        ...state,
        timebox: (timebox.finished = true),
        currentTimeboxId: null,
      };
    }
    default: {
      return state;
    }
  }
}

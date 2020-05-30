import {
  TIMEBOXES_SET,
  TIMEBOX_ADD,
  TIMEBOX_REMOVE,
  TIMEBOX_REPLACE,
} from "../constants/types";

// const initialState = {
//   timeboxes: [],
// };

export default function timeboxesReducer(state = [], action) {
  switch (action.type) {
    case TIMEBOXES_SET: {
      const { timeboxes } = action;
      return timeboxes;
    }
    case TIMEBOX_ADD: {
      const { timebox } = action;
      const timeboxes = [...state, timebox];
      return timeboxes;
    }
    case TIMEBOX_REMOVE: {
      const { removedTimebox } = action;
      const timeboxes = state.filter(
        (timebox) => timebox.id !== removedTimebox.id
      );
      return timeboxes;
    }
    case TIMEBOX_REPLACE: {
      const { replacedTimebox } = action;
      const timeboxes = state.map((timebox) =>
        timebox.id === replacedTimebox.id ? replacedTimebox : timebox
      );
      return timeboxes;
    }
    default: {
      return state;
    }
  }
}

export const getAllTimeboxes = (state) => state;
export const getRemainingTimeboxes = (state) =>
  state.filter(
    (timebox) =>
      timebox.id !== state.currentTimeboxId && timebox.finished === false
  );
export const getTimeboxById = (state, timeboxId) =>
  state.find((timebox) => timebox.id === timeboxId);

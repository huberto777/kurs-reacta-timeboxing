import { LOADING_INDICATOR_DISABLE } from "../constants/types";

export function timeboxesAreLoadingReducer(state = true, action) {
  switch (action.type) {
    case LOADING_INDICATOR_DISABLE: {
      return false;
    }
    default: {
      return state;
    }
  }
}

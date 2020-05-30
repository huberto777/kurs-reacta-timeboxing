import { SEARCH_INPUT } from "../constants/types";

// const initialState = {
//   timeboxesSearch: [],
// };

export default function timeboxesSearchReducer(state = [], action) {
  switch (action.type) {
    case SEARCH_INPUT: {
      const { payload } = action;
      return payload;
    }

    default: {
      return state;
    }
  }
}

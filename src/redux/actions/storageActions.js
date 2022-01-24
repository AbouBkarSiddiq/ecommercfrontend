import { GET_ITEMS, SET_ITEMS } from "../constants/index";

export const loadState = () => {
  try {
    const items = JSON.parse(localStorage.getItem("item") || '[]')
    if (items) {
      return {
        type: GET_ITEMS,
        payload: items
      }
    }
    else {
      // dispatch(setIsFetching(false));
    }
  } catch (error) {
    console.log("Error:", error)
  }
};

export const saveState = (state) => {
  console.log("State at actions:", state)
  try {
    // const items = JSON.stringify(state)
    const items = state;
    localStorage.setItem("item", JSON.stringify(items));
    if (items) {
      return {
        type: SET_ITEMS,
        payload: items
      }
    }
    else {
      // dispatch(setIsFetching(false));
    }
  } catch (error) {
    console.log("Error:", error)
  }

};
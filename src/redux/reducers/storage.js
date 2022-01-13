import { GET_ITEMS, SET_ITEMS } from "../constants/index";

const initialState = {
  cartItems: [],
  item: {},
  isFetching: false,
};

const storageReducer = (state = initialState, action) => {
  // console.log("Save state data at reducer:", action.payload)
  switch (action.type) {
    case GET_ITEMS:
      // console.log('data at reducer:', state)
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_ITEMS:
      console.log('data at reducer of set Items local storage:', state)
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

export default storageReducer;
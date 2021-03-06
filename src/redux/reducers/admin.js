import { GET_ALL_USERS, GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, ADD_PRODUCT, ADD_CATEGORY, GET_TODO_DETAIL, DELETE_USER, CREATE_TODO, GET_CATEGORY_DATA_TO_UPDATE, GET_PRODUCT_DATA_TO_UPDATE, UPDATE_CATEGORY, UPDATE_PRODUCT, SET_IS_FETCHING, CREATE_TOKEN, GET_SINGLE_PRODUCT, ADD_COMMENT, GET_ALL_COMMENTS, SET_IS_FETCHING_MESSAGE } from "../constants/index";

const initialState = {
  users: [],
  user: {},
  categories: [],
  category: {},
  products: [],
  product: {},
  messages: [],
  message: {},
  stripeToken: {},
  isFetching: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_IS_FETCHING_MESSAGE: {
      return {
        ...state,
        isFetchingMessage: action.payload,
      }
    }
    case GET_ALL_USERS:
      // console.log('data at reducer:', state)
      return {
        ...state,
        isFetching: false,
        users: action.payload,
      };

    case GET_ALL_CATEGORIES:
      // console.log('data at reducer:', state)
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    case GET_ALL_PRODUCTS:
      // console.log('data at reducer:', state)
      return {
        ...state,
        isFetching: false,
        products: action.payload,
      };
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        isFetching: false,
        product: action.payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        isFetching: false,
        product: action.payload,
      };
    case GET_TODO_DETAIL:
      console.log('data at reducer:', action.payload)
      return {
        ...state,
        isFetching: false,
        todo: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        isFetching: false,
        category: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        isFetching: false,
        product: action.payload,
      };
    case GET_CATEGORY_DATA_TO_UPDATE:
      return {
        ...state,
        isFetching: false,
        category: action.payload,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        isFetching: false,
        category: action.payload,
      };
    case CREATE_TOKEN:
      return {
        ...state,
        isFetching: false,
        stripeToken: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        isFetchingMessage: false,
        message: action.payload,
      };
    case GET_ALL_COMMENTS:
      return {
        ...state,
        isFetchingMessage: false,
        messages: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
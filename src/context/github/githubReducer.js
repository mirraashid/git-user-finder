import * as Types from '../types';
import {initialState} from "./GithubState";

export default (state, action) => {
  switch (action.type) {
    case Types.CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };

    case Types.UPDATE_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case Types.APPEND_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
        loading: false,
      };

    case Types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    
    case Types.UNSET_LOADING:
      return {
        ...state,
        loading: false,
      };

    case Types.SET_PAGE_COUNT:
      return {
        ...state,
        totalCount: action.payload,
      };

    case Types.SET_QUERY_DATA:
      return {
        ...state,
        serachQuery: action.payload,
      };

    case Types.UPDATE_CURR_PAGE:
      return {
        ...state,
        currPage: action.payload,
      };

    case Types.RESET_USERS_DATA:
      return initialState;

    default:
      return state;
  }
};

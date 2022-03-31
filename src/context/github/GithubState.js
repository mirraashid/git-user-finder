import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import AlertContext from '../../context/alert/alertContext';
import * as Types from '../types';


export const initialState = {
  serachQuery: null,
  totalCount: 0,
  users: [],
  loading: false,
  currPage: 1,
};

const GithubState = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  

  const [state, dispatch] = useReducer(GithubReducer, initialState);


  //fetchUsers
  const fetchUsers = async(query, page) => {
    const url = `https://api.github.com/search/users?q=${query}&page=${page}`;
    const res = await axios.get(url);
    return res;
  }

  // Search Users
  const searchUsers = async text => {
    setLoading();

    const usersRes = await fetchUsers(text, 1);
    if(usersRes.status !== 200 || usersRes.data.items?.length === 0){
      initState();
      setAlert('No results found!');
    }else{
      setQueryData(text);
      updateUsers(usersRes.data.items);
      setTotalPageCount(usersRes.data.total_count)
    }

    unsetLoading();
  };

  const loadMoreUsers = async() => {
        const {serachQuery} = state; 
        const moreUsers = await fetchUsers(serachQuery, state.currPage+1);

        if(moreUsers.status !== 200){
          setAlert('No results found!')
        }else{
          updateUsers(moreUsers.data.items, true);
          updateCurrentPage(state.currPage+1)
        }
  }

  //Update Users
  const updateUsers = (userData, isAppend = false) => dispatch({type: !isAppend ? Types.UPDATE_USERS : Types.APPEND_USERS, payload: userData})


  // Clear Users
  const clearUsers = () => dispatch({ type: Types.CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: Types.SET_LOADING });

  //UnSet Loading
  const unsetLoading = () => dispatch({ type: Types.UNSET_LOADING });

  //Set Query Data
  const setQueryData = (data) => dispatch({ type: Types.SET_QUERY_DATA, payload: data});

  //Update Page Count
  const setTotalPageCount = (data) => dispatch({ type: Types.SET_PAGE_COUNT, payload: data});

  //Update Current page
  const updateCurrentPage = (data) => dispatch({ type: Types.UPDATE_CURR_PAGE, payload: data });

  //initState
  const initState = () => dispatch({ type: Types.RESET_USERS_DATA});



  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        totalCount: state.totalCount,
        searchUsers,
        clearUsers,
        loadMoreUsers,
        initState
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;

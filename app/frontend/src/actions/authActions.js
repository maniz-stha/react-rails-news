import axios from 'axios';

import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (userData, history) => dispatch => {
    
    axios.post('/api/users/register', userData)
        .then(user => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};


export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then( res => {
        //save to localStorage 
            const userData = res.data.data;
            const { token } = userData
            delete userData.token;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userData', JSON.stringify(userData))
            setAuthToken(token);
            //set current user
            dispatch(setCurrentUser(userData));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
    })
};  


export const logoutUser = () => dispatch => {
    //remove jwttoken from localstorage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future request
    setAuthToken(false);
    //set current user to {}
    dispatch(setCurrentUser({}));
}

export const setCurrentUser = userData => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    };
};
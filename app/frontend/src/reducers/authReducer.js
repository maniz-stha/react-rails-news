import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validatons/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        //set auth state with current user data
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        //return the initial state on default case
        default:
            return state
    }
}
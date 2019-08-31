import { SET_NEWS_LIST } from "../actions/types";
const initialState = {
    newsList: null,
    news: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        //set auth state with current user data
        case SET_NEWS_LIST:
            return {
                ...state,
                newsList: action.payload
            }
        //return the initial state on default case
        default:
            return state
    }
}
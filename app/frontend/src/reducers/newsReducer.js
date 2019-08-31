import { SET_NEWS_LIST, ADD_NEWS } from "../actions/types";
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
        case ADD_NEWS:
            return {
                ...state,
                newsList: [action.payload, ...state.news.newsList]
            }
        //return the initial state on default case
        default:
            return state
    }
}
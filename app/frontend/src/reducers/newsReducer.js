import { SET_NEWS_LIST, SET_NEWS, ADD_NEWS, DELETE_NEWS } from "../actions/types";
const initialState = {
    newsList: null,
    news: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        //set newslist state with list of news
        case SET_NEWS_LIST:
            let newsList = action.payload;
            const listItem = newsList.map(news => {
                const item = { ...news.news, comments: news.comments, user: news.user };
                return item;
            });
            return {
                ...state,
                newsList: listItem
            }
        //set single news item
        case SET_NEWS:
            const news = action.payload;
            const newsItem = { ...news.news, comments: news.comments, user: news.user };
            return {
                ...state,
                news: newsItem
            }
        // add news
        case ADD_NEWS:
            return {
                ...state,
                newsList: [action.payload, ...state.news.newsList]
            }
        //delete news
        case DELETE_NEWS:
            return {
                ...state,
                newsList: state.newsList.filter(news => news.id !== action.payload)
            }
        //return the initial state on default case
        default:
            return state
    }
}
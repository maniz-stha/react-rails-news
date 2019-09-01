import { SET_NEWS_LIST, SET_NEWS, ADD_NEWS, DELETE_NEWS, SET_COMMENT, DELETE_COMMENT } from "../actions/types";
const initialState = {
    newsList: null,
    news: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        //set newslist state with list of news
        case SET_NEWS_LIST:
            let newsList = action.payload;
            const listItem = newsList.map(news => ({ ...news.news, comments: news.comments, user: news.user }));
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
        case SET_COMMENT:
            let updatedComments = [...state.news.comments, action.payload];
            const currentNewsItem = { ...state.news, comments: updatedComments, user: state.news.user}
            return {
                ...state,
                news: currentNewsItem
            }
        //delete comment
        case DELETE_COMMENT:
            let comments = state.news.comments.filter(comment => comment.id !== action.payload)
            const updatedNewsItem = { ...state.news, comments: comments, user: state.news.user}
            return {
                ...state,
                news: updatedNewsItem
            }
        //return the initial state on default case
        default:
            return state
    }
}
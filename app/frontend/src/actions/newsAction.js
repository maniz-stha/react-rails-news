import axios from 'axios';

import { GET_ERRORS, DELETE_NEWS } from './types';
import { SET_NEWS_LIST, SET_NEWS } from './types';

//get all news list
export const getNewsList = () => dispatch => {
    axios.get('/api/news/')
        .then(res => { 
            const newsList = res.data;
            dispatch({
                type: SET_NEWS_LIST,
                payload: newsList.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_NEWS_LIST,
                payload: {}
            });
         });
};

// create news
export const addNews = (newsData, history) => dispatch => {
    axios.post('/api/news', newsData)
        .then(
            res => history.push('/feeds')
        )
        .catch(
            err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

//get specific news by id
export const getNews = id => dispatch => {
    axios.get(`/api/news/${id}`)
        .then(res => { 
            const news = res.data;
            dispatch({
                type: SET_NEWS,
                payload: news.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
         });
};

//edit news
export const editNews = (id, newsData, history) => dispatch => {
    axios.put(`/api/news/${id}`, newsData)
        .then(
            res => history.push('/feeds')
        )
        .catch(
            err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// delete news
export const deleteNews = id => dispatch => {
    axios.delete(`/api/news/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_NEWS,
                payload: id
            })
        )
        .catch(
            err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}
import axios from 'axios';

import { GET_ERRORS } from './types';
import { SET_NEWS_LIST } from './types';

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
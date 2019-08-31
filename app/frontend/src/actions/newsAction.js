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
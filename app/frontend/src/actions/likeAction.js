import axios from 'axios';

import { GET_ERRORS } from './types';
import { getNewsList, getNews } from './newsAction';

export const addLike = (newsId, userId, action = 'list') => dispatch => {
    const likeData = {
        news_id: newsId,
        user_id: userId
    };
    axios.post(`/api/news/${newsId}/likes`, likeData)
        .then(res => {
            //if liked from list page, get all news list otherwise get particular news
            if (action == 'list') {
                dispatch(getNewsList())
            } else {
                dispatch(getNews(newsId))
            }
        })
        .catch(
            err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// delete comment
export const removeLike = (newsId, likeId, action='list') => dispatch => {
    axios.delete(`/api/news/${newsId}/likes/${likeId}`)
        .then(res =>{
            if (action == 'list') {
                dispatch(getNewsList())
            } else {
                dispatch(getNews(newsId))
            }
        })
        .catch(
            err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

import axios from 'axios';

import { SET_COMMENT, GET_ERRORS, DELETE_COMMENT } from './types';

export const addComment = commentData => dispatch => {
    axios.post(`/api/news/${commentData.news_id}/comments`, commentData)
        .then(
            res => dispatch({
                type: SET_COMMENT,
                payload: res.data.data
            })
        )
        .catch(
            err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// delete comment
export const deleteComment = (news_id, comment_id) => dispatch => {
    axios.delete(`/api/news/${news_id}/comments/${comment_id}`)
        .then(res =>
            dispatch({
                type: DELETE_COMMENT,
                payload: comment_id
            })
        )
        .catch(
            err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

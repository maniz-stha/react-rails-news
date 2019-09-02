import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { deleteComment } from '../../actions/commentAction';

class CommentItem extends Component {
    onDeleteClick(news_id, comment_id) {
        if (window.confirm('Are you sure you want to delete the comment')) {
            this.props.deleteComment(news_id, comment_id);
        }
    }
    render() {
        const { comment, currentUserId } = this.props;
        return (
            <div className="comment-item">
                <ul className="list-group">
                    <li className="list-group-item mb-2">
                        <div className="comment">
                            <span className="comment-user">{comment.user.username}</span> says:&nbsp;
                            <span className="comment-text">{comment.comment}</span>
                            {
                                comment.user_id === currentUserId ? (
                                    <span className="comment-actions float-right">
                                        <a href="#" onClick={this.onDeleteClick.bind(this, comment.news_id, comment.id)} className="comment-delete news-action">
                                            <i className="fas fa-times" />
                                        </a>
                                    </span>
                                ) : null
                            }
                        </div>
                        <div className="comment-time small tex-muted">
                            <Moment fromNow>{comment.updated_at}</Moment>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect(null, { deleteComment })(CommentItem);
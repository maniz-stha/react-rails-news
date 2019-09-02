import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { deleteNews } from '../../actions/newsAction';
import { addLike, removeLike } from '../../actions/likeAction';

class NewsItem extends Component {

    // like or dislike news when like button is clicked
    onLikeClick(newsId, userId, isNewsLiked, likeId) {
        if (!isNewsLiked) {
            this.props.addLike(newsId, userId);
        } else {
            this.props.removeLike(newsId, likeId);
        }
    }

    //check if current user liked the news
    findUserLike(likes) {
        const { auth } = this.props;
        if (Object.values(likes).includes(auth.user.id)) {
            return true;
        }
        return false
    }

    onDeleteClick(id) {
        if (window.confirm('Are you sure you want to delete the news item')) {
            this.props.deleteNews(id);
        }
    }

    render() {
        const { news, auth } = this.props;
        const isNewsLiked = this.findUserLike(news.likes);
        let likeId = 0;
        if (isNewsLiked) {
            likeId = Object.keys(news.likes).find(key => news.likes[key] == auth.user.id);
        }
        return (
            <div className="card card-body bg-light mb-3">
                <div className="news-title">
                    <a className="news-link" href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a>
                    <span className="news-source ml-3">({news.source})</span>
                </div>
                <div className="news-info">
                    <a href="#" className="news-like news-action" onClick={this.onLikeClick.bind(this, news.id, auth.user.id, isNewsLiked, likeId)}>
                        <i className={classnames('fas fa-thumbs-up', {
                            'text-info': isNewsLiked
                        })} />
                        { Object.keys(news.likes).length > 0 ? (
                            <span className="badge badge-dark ml-2">{Object.keys(news.likes).length}</span>
                        ) : null}
                    </a>
                    <Link to={`/news/${news.id}/comments`} className="news-comment news-action mx-5">
                        Comment
                        {news.comments > 0 ? (
                            <span className="badge badge-dark ml-2">{news.comments}</span>
                        ) : null}
                    </Link>
                    <span className="news-poster mr-3">
                        Posted by ({news.user}) <Moment fromNow>{news.updated_at}</Moment>
                    </span>
                    {
                        // if posted by same user, allow edit and delete
                        news.user_id === auth.user.id ? (
                            <span className="actions float-right">
                                <Link className="news-edit news-action mr-2" to={`/news/${news.id}/edit`}>
                                    <i className="fas fa-edit" />
                                </Link>
                                <a href="#" onClick={this.onDeleteClick.bind(this, news.id)} className="news-delete news-action">
                                    <i className="fas fa-times" />
                                </a>
                            </span>
                        ): null
                    }
                </div>
            </div>
        )
    }
}

NewsItem.propTypes = {
    news: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteNews: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteNews, addLike, removeLike})(NewsItem);
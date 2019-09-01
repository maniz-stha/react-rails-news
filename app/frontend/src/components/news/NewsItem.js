import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteNews } from '../../actions/newsAction';

class NewsItem extends Component {

    onLikeClick() {
        //TODO: like on news
        alert('liked');
    }

    onDeleteClick(id) {
        if (window.confirm('Are you sure you want to delete the news item')) {
            this.props.deleteNews(id);
        }
    }

    render() {
        const { news, auth } = this.props;
        return (
            <div className="card card-body bg-light mb-3">
                <div className="news-title">
                    <a className="news-link" href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a>
                    <span className="news-source ml-3">({news.source})</span>
                </div>
                <div className="news-info">
                    <a href="#" className="news-like news-action" onClick={this.onLikeClick.bind(this)}>
                        <i className="fas fa-thumbs-up" />
                        { news.likes > 0 ? (
                            <span className="badge badge-dark ml-2">{news.likes}</span>
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
    deleteNews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteNews})(NewsItem);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NewsItem extends Component {
    render() {
        const { news } = this.props;
        return (
            <div className="card card-body bg-light mb-3">
                <div className="news-title">
                    <a className="news-link" href={news.link} target="_blank">{news.title}</a>
                    <span className="news-source ml-3">({news.source})</span>
                </div>
                <div className="news-info">
                    <span className="news-like mr-3">Likes</span>
                    <span className="news-coment mr-3">Comments</span>
                    <span className="news-poster mr-3">Posted by user ({news.user_id})</span> at  
                    <span>{news.updated_at}</span>
                </div>
            </div>
        )
    }
}

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

export default NewsItem;
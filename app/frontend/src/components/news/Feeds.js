import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getNewsList } from '../../actions/newsAction';
import NewsItem from './NewsItem';

class Feeds extends Component {
    componentDidMount() {
        this.props.getNewsList();
    }
    render() {
        const { newsList } = this.props;
        let newsItems;
        if (newsList && newsList.length > 0) {
            newsItems = newsList.map(item => (
                <NewsItem key={item.id} news={item}/>
            ));
        } else {
            newsItems = (
                <h4>No news item yet!</h4>
            );
        }
        return (
            <div className="feeds row">
                <div className="col-md-12">
                    <h2 className="text-center my-3">News listings</h2>
                    <div className="news-list">
                        {newsItems}
                    </div>
                </div>
            </div>
        )
    }
}

Feeds.propTypes = {
    newsList: PropTypes.array,
    getNewsList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    newsList: state.news.newsList
});

export default connect(mapStateToProps, {getNewsList})(Feeds);
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getFilteredNewsList } from '../../actions/newsAction';
import NewsItem from './NewsItem';

class Search extends Component {
    componentDidMount() {
        const searchTerm = this.props.match.params.term;
        this.props.getFilteredNewsList(searchTerm);
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
            <div className="news-list row">
                <div className="col-md-12">
                    <h2 className="text-center">News listings</h2>
                    {newsItems}
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    newsList: PropTypes.array,
    getFilteredNewsList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    newsList: state.news.newsList
});

export default connect(mapStateToProps, {getFilteredNewsList})(Search);
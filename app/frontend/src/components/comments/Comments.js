import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { getNews } from '../../actions/newsAction';
import { addComment } from '../../actions/commentAction';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import HiddenInput from '../common/HiddenInput';
import CommentItem from './CommentItem';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news_id: '',
            user_id: '',
            title: '',
            link: '',
            source: '',
            comment: '',
            comments: {},
            user: {},
            updated_at: '',
            errors: {},
            news: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const newsId = this.props.match.params.id;
        this.props.getNews(newsId);
    }

    componentWillReceiveProps(nextProps) {
        const { news, errors, user } = nextProps;

        if (errors) {
            this.setState({errors})
        }
        if (nextProps.news) {
            this.setState({
                news_id: news.id,
                user_id: user.id,
                title: news.title,
                link: news.link,
                source: news.source,
                comments: news.comments,
                user: news.user,
                updated_at: news.updated_at,
                news
            });
        }
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault();
        const commentData = {
            user_id: this.state.user_id,
            news_id: this.state.news_id,
            comment: this.state.comment
        };
        this.props.addComment(commentData);
        this.state.comment = '';
    }

    onLikeClick() {
        console.log('liked')
    }

    render() {
        const { errors } = this.props;
        const comments = this.state.comments;
        let commentsList;
        if (comments && comments.length > 0) {
            commentsList = comments.map(item => (
                <CommentItem key={item.id} comment={item} currentUserId={this.props.user.id}/>
            ));
        } else {
            commentsList = (
                <h4>No comments yet!</h4>
            );
        }
        return (
            <div className="card card-body bg-light my-3">
                <div className="news-title">
                    <a className="news-link" href={this.state.link} target="_blank" rel="noopener noreferrer">{this.state.title}</a>
                    <span className="news-source ml-3">({this.state.source})</span>
                </div>
                <div className="news-info">
                    <a href="#" className="news-like news-action" onClick={this.onLikeClick.bind(this)}>
                        <i className="fas fa-thumbs-up" />
                        <span className="badge badge-dark ml-2">1</span>
                    </a>
                    <span className="news-comment news-action mx-5">
                        Comment
                        {this.state.comments.length > 0 ? (
                            <span className="badge badge-dark ml-2">{this.state.comments.length}</span>
                        ) : null}
                    </span>
                    <span className="news-poster mr-3">
                        Posted by ({this.state.user.username}) <Moment fromNow>{this.state.updated_at}</Moment>
                    </span>
                </div>
                <hr/>
                <div className="comment-box mt-3">
                    <form onSubmit={this.onSubmit}>
                        <HiddenInput
                            name="news_id"
                            value={this.state.news_id}
                            onChange={this.onChange}
                            error={errors.news_id}
                        />  
                        <HiddenInput
                            name="user_id"
                            value={this.state.user_id}
                            onChange={this.onChange}
                            error={errors.user_id}
                        />  
                        <TextAreaFieldGroup
                            placeholder="Give some comment"
                            name="comment"
                            value={this.state.comment}
                            onChange={this.onChange}
                            error={errors.comment}
                            label="Comment"
                        />
                        <button type="submit" className="btn btn-primary btn-sm float-right">Comment</button>
                    </form>
                </div>
                <hr/>
                { commentsList }
            </div>
        )
    }
}

Comments.propTypes = {
    user: PropTypes.object.isRequired,
    news: PropTypes.object,
    errors: PropTypes.object.isRequired,
    getNews: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user,
    news: state.news.news,
    errors: state.errors
});

export default connect(mapStateToProps, {getNews, addComment})(Comments);
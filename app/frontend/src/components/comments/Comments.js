import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { getNews } from '../../actions/newsAction';
import { addComment } from '../../actions/commentAction';
import { addLike, removeLike } from '../../actions/likeAction';
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
        this.setState({ comment: '' });
    }

    // like or dislike the news when like button is clicked
    onLikeClick(newsId, userId, isNewsLiked, likeId) {
        if (!isNewsLiked) {
            this.props.addLike(newsId, userId, 'show');
        } else {
            this.props.removeLike(newsId, likeId, 'show');
        }
    }

    // find if the current user liked the news
    findUserLike(likes) {
        const { user } = this.props;
        if (likes && Object.values(likes).includes(user.id)) {
            return true;
        }
        return false
    }

    render() {
        const { errors, user } = this.props;
        const comments = this.state.comments;
        const isNewsLiked = this.findUserLike(this.state.news.likes);
        let likeId = 0;
        if (isNewsLiked) {
            likeId = Object.keys(this.state.news.likes).find(key => this.state.news.likes[key] == user.id);
        }
        let commentsList;
        if (comments && comments.length > 0) {
            commentsList = comments.map(item => (
                <CommentItem key={item.id} comment={item} currentUserId={user.id}/>
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
                    <a href="#" className="news-like news-action" onClick={this.onLikeClick.bind(this, this.state.news_id, this.state.user_id, isNewsLiked, likeId)}>
                        <i className={classnames('fas fa-thumbs-up', {
                            'text-info': isNewsLiked
                        })} />
                        { (this.state.news.likes && Object.values(this.state.news.likes).length > 0) ? (
                            <span className="badge badge-dark ml-2">{Object.values(this.state.news.likes).length}</span>
                        ) : null}
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
    addComment: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user,
    news: state.news.news,
    errors: state.errors
});

export default connect(mapStateToProps, {getNews, addComment, addLike, removeLike})(Comments);
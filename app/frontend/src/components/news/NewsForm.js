import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import HiddenInput from '../common/HiddenInput';
import { addNews, editNews, getNews } from '../../actions/newsAction';
import isEmpty from '../../validatons/isEmpty';

class NewsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.user.id,
            title: '',
            link: '',
            source: '',
            errors: {},
            buttonTxt: 'Add news'
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault();
        const newsData = {
            user_id: this.state.user_id,
            title: this.state.title,
            source: this.state.source,
            link: this.state.link
        };
        // handle route based on the action prop of component
        if (this.props.action === 'edit') {
            const newsId = this.props.match.params.id;
            this.props.editNews(newsId, newsData, this.props.history);
        } else {
            this.props.addNews(newsData, this.props.history);
        }
    }

    componentDidMount() {
        //get news if edit action
        if (this.props.action === 'edit') {
            const newsId = this.props.match.params.id;
            this.props.getNews(newsId);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.news) {
            // in case of edit news, get news from props and add to state
            const news = nextProps.news;
            news.user_id = !isEmpty(news.user_id) ? news.user_id : '';
            news.title = !isEmpty(news.title) ? news.title : '';
            news.link = !isEmpty(news.link) ? news.link : '';
            news.source = !isEmpty(news.source) ? news.source : '';
            this.setState({
                user_id: news.user_id,
                title: news.title,
                source: news.source,
                link: news.link, 
                buttonTxt: 'Edit news'
            });
        }
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="news-form">
                <form onSubmit={this.onSubmit}>
                    <HiddenInput
                        name="user_id"
                        value={this.state.user_id}
                        onChange={this.onChange}
                        error={errors.user_id}
                        />  
                    <TextFieldGroup
                        type="text"
                        id="title"
                        placeholder="Enter Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        error={errors.title}
                        label="Title"
                        />                                
                    <TextFieldGroup
                        type="text"
                        id="link"
                        placeholder="Enter Link"
                        name="link"
                        value={this.state.link}
                        onChange={this.onChange}
                        error={errors.link}
                        label="Link"
                    />
                    <TextFieldGroup
                        type="text"
                        id="source"
                        placeholder="Enter Source"
                        name="source"
                        value={this.state.source}
                        onChange={this.onChange}
                        error={errors.source}
                        label="Source"
                    />
                    <button type="submit" className="btn btn-primary btn-lg">{ this.state.buttonTxt }</button>
                </form>
            </div>
        )
    }
}

NewsForm.propTypes = {
    addNews: PropTypes.func.isRequired,
    editNews: PropTypes.func.isRequired,
    getNews: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    user: state.auth.user,
    news: state.news.news
});

//set default action to 'add' news
NewsForm.defaultProps = {
    action: 'add'
};

export default connect(mapStateToProps, {addNews, editNews, getNews})(withRouter(NewsForm));
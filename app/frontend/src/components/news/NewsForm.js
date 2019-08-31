import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import HiddenInput from '../common/HiddenInput';
import { addNews } from '../../actions/newsAction';

class NewsForm extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            user_id: props.user.id,
            title: '',
            link: '',
            source: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault();
        const newNews = {
            user_id: this.state.user_id,
            title: this.state.title,
            source: this.state.source,
            link: this.state.link
        };
        this.props.addNews(newNews, this.props.history);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
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
                    <button type="submit" className="btn btn-primary btn-lg">Add news</button>
                </form>
            </div>
        )
    }
}

NewsForm.propTypes = {
    addNews: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    user: state.auth.user
});
export default connect(mapStateToProps, {addNews})(withRouter(NewsForm));
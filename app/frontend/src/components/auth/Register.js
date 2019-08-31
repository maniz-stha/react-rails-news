import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        };
        this.props.registerUser(newUser, this.props.history)
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register row">
                <div className="col-md-8 m-auto">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                            error={errors.username}
                            label="Username"
                        />
                        <TextFieldGroup
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                            label="Name"
                        />
                        <TextFieldGroup
                            type="text"
                            id="email"
                            placeholder="Enter Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            label="Email"
                        />
                        <TextFieldGroup
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                            label="Password"
                        />
                        <TextFieldGroup
                            type="password"
                            id="password_confirmation"
                            placeholder="Confirm Password"
                            name="password_confirmation"
                            value={this.state.password_confirmation}
                            onChange={this.onChange}
                            error={errors.password_confirmation}
                            label="Confirm Password"
                        />
                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {registerUser})(withRouter(Register));
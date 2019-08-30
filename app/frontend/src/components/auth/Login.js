import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
    constructor() {
        super();
        //set default state
        this.state = {
            identity: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // redirect to feeds page when logged in
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/feeds');
        }

        // set errors to state
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        const user = {
            identity: this.state.identity,
            password: this.state.password,
        };
        this.props.loginUser(user);
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="login row">
                <div className="col-md-8 m-auto">
                    <h2 className="text-center">Log In</h2>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            type="text"
                            placeholder="Enter email or username"
                            label="Email Address / Username"
                            name="identity"
                            id="identity"
                            info="Use your email address or username to login"
                            value={this.state.identity}
                            onChange={this.onChange}
                            error={errors.identity}
                        />
                        <TextFieldGroup
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                        />
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStatesToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStatesToProps, {loginUser})(Login);
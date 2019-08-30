import React, { Component } from 'react'

class Login extends Component {
    render() {
        return (
            <div className="login row">
                <div className="col-md-8 m-auto">
                    <h2 className="text-center">Log In</h2>
                    <form>
                        <div class="form-group">
                            <label for="identity">Email Address / Username</label>
                            <input type="text" class="form-control" name="identity" id="identity" aria-describedby="identityHelp" placeholder="Enter email or username"/>
                            <small id="identityHelp" class="form-text text-muted">Use your email address or username to login</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" id="password" placeholder="Password"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
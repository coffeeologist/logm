import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './firebase.utils';

class Register extends Component {

    // input fields and storage
    state = {
        email: '',
        password: '',
        error: null,
    };

    // Keep form input field updated
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Submit user information to firebase to create user account
    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => { this.props.history.push('/'); })
            .catch((error) => { this.setState({ error: error }); });
    };

    // Render registration form
    render() {
        const { email, password, error } = this.state;
        return (
            <div>
                <p>Register</p>

                {error ? (
                    <p>{error.message }</p>
                ) : null}

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleInputChange}/>

                        <button children="Register" />
                    </form>
                </div>
            </div>
        );
    }
}
export default withRouter(Register);
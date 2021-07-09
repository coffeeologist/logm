import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './firebase.utils';
import { signInWithGoogle } from './firebase.utils.js';

// Login class with input fields
class Login extends Component {

    // input fields and storage
    state = {
        email: '',
        password: '',
        error: null,
        userCredential: null
    };

    // Keep input form updated
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Submit to Firebase for authentication
    handleFormSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => { this.props.history.push('/'); })
            .catch((error) => { this.setState({ error: error }); });
    };

    // Render input form
    render() {
        const { email, password, error } = this.state;
        return (
            <div>
                <p>Log In</p>

                {error ? (
                    <p>{error.message}</p>
                ) : null}

                <div>
                    <form onSubmit={this.handleFormSubmit}>
                        <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleInputChange} />
                        <button children="Log In" />
                    </form>
                </div>

                {/* Separate sign in functionality with google account */}
                <div>
                    <button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
import React, { Component } from 'react';
import Navigation from './Navigation';
import firebase from './firebase.utils';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    // Keeps track of authentication details
    state = {
        authenticated: false,
        userCredential: null
    };

    componentDidMount() {
        // Change authentication state accordingly
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState(() => ({
                    authenticated: true,
                    userCredential: user
                }))
            }
            else {
                this.setState(() => ({
                    authenticated: false,
                    userCredential: null
                }))
            }
        });
    }

    // Render the navigation bar that will handle/differentiate between authenticated vs not users
    render() {
        return <Navigation authenticated={this.state.authenticated} userCredential={this.state.userCredential} />;
    }
}

export default App;
import React, { Component } from 'react';
import GeneralNavigation from './GeneralNavigation';
import firebase from './firebase.utils';
import { Scrollbars } from 'react-custom-scrollbars';

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
                }));
                localStorage.setItem('authenticated', true);
                localStorage.setItem('userCredential', user);
            }
            else {
                this.setState(() => ({
                    authenticated: false,
                    userCredential: null
                }))
                localStorage.removeItem('authenticated');
                localStorage.removeItem('userCredential');
            }
        });
    }

    // Render the navigation bar that will handle/differentiate between authenticated vs not users
    render() {
        return (
            <Scrollbars id="main-scrollbar">
                <GeneralNavigation authenticated={this.state.authenticated} userCredential={this.state.userCredential} />
            </Scrollbars>
    
        );
        }
}

export default App;
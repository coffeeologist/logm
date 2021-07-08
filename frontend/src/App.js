import React, { Component } from 'react';
import Navigation from './Navigation';
import firebase from './firebase.utils';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    state = {
        authenticated: false,
        userCredential: null
    };

 componentDidMount() {
//    firebase.auth().onAuthStateChanged((authenticated) => {
//      authenticated
//        ? this.setState(() => ({
//            authenticated: true,
//          }))
//        : this.setState(() => ({
//            authenticated: false,
//          }));
//    });
    console.log(this.state.authenticated);
   firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in.
        // this.setState(() => ({
        //     authenticated: true,
        //     userCredential: user
        // }))
       this.setState(() => ({
           authenticated: true,
           userCredential: user
         }))
        console.log(this.state.authenticated);
    }
    else {
        this.setState(() => ({
            authenticated: false,
            userCredential: null
        }))
    }
    });
 }
 render() {
   return <Navigation authenticated={this.state.authenticated} userCredential={this.state.userCredential} />;
 }
}
export default App;
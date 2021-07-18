import React, { Component } from 'react';
import NewMemoBox from './NewMemoBox';
import { withRouter, NavLink } from 'react-router-dom';

import LogOut from './LogOut';

// Main dashboard for each user
class Dashboard extends Component {
 render() {
    //  console.log(this.props.userCredential.uid);
    return (
        <div>
            <p>Welcome! To dashboard </p>
            <div>Logged in?: {this.props.authenticated.toString()} |</div>
            <div>Logged in with email address: {this.props.userCredential.email}</div>
            <div>uid: {this.props.userCredential.uid}</div>
        </div>
    );
    }
}

export default withRouter(Dashboard);
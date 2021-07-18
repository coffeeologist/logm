import React, { Component } from 'react';
import NewMemoBox from './NewMemoBox';
import { withRouter, NavLink } from 'react-router-dom';

import LogOut from './LogOut';

// Main dashboard for each user
class Dashboard extends Component {
 render() {
    return (
        <div>
            <p>Welcome! To dashboard </p>
            <div>Logged in?: {localStorage.getItem('authenticated').toString()} |</div>
            <div>Logged in with email address: {localStorage.getItem('email')}</div>
            <div>uid: {localStorage.getItem('uid')}</div>
            <div> Insert big pretty clock here</div>
        </div>
    );
    }
}

export default withRouter(Dashboard);
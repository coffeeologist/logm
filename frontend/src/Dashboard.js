import React, {Component} from 'react';
import NewMemoBox from './NewMemoBox';
import { withRouter, NavLink } from 'react-router-dom';
import LogOut from './LogOut';

// Main dashboard for each user
class Dashboard extends Component {
 render() {
    return (
        <div>
            <p>Welcome! To dashboard </p>
            <div>Logged in?: {this.props.authenticated.toString()} |</div>
            <div>Logged in with email address: {this.props.userCredential.email}</div>
            <div>uid: {this.props.userCredential.uid}</div>
            <LogOut/>

            <NewMemoBox userCredential={this.props.userCredential} />
        </div>
    );
    }
}

export default withRouter(Dashboard);
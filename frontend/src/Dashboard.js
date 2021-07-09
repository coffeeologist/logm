import React, {Component} from 'react';
import NewMemoBox from './NewMemoBox';
import MemoGallery from './MemoGallery';

// Main dashboard for each user
class Dashboard extends Component {
 render() {
    return (
        <div>
            <p>Welcome! To dashboard </p>
            <div>Logged in?: {this.props.authenticated.toString()} |</div>
            <div>Logged in with email address: {this.props.userCredential.email}</div>
            <div>uid: {this.props.userCredential.uid}</div>

            <NewMemoBox userCredential={this.props.userCredential} />
            <MemoGallery userCredential={this.props.userCredential} />
        </div>
    );
    }
}

export default Dashboard;
import React, { Component } from 'react';
import NewMemoBox from './NewMemoBox';
import { withRouter } from 'react-router-dom';

// Main dashboard for each user
class Memos extends Component {
 render() {
    return (
        <div>
            <h1>Memos</h1>
            <NewMemoBox userCredential={this.props.userCredential} children="Memo Gallery"/>
        </div>
    );
    }
}

export default withRouter(Memos);
import React, { Component } from 'react';
import NewMemoBox from './MemoGallery';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';


// Middle-man/ wrapper class for the memos page
class Memos extends Component {

    componentDidMount = e => {
        // Change background splash
        document.body.style.backgroundColor = "#6B705C"
    }

    componentWillUnmount = e => {
        // Revert it back to normal
        document.body.style.backgroundColor = "transparent";
    }

    render() {
    
        return (
            <div>
                <div>
                    <h1 id="memos-header">Memos</h1>
                    <h3 id="memos-sub-header"> — Notes • Recollections • Reminders </h3>
                </div>
                <NewMemoBox userCredential={this.props.userCredential} children="Memo Gallery"/>
            </div>
        );
    }
}

export default withRouter(Memos);
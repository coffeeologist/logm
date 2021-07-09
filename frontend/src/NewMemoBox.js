import React, {Component} from 'react';
import firebase from './firebase.utils';
import MemoGallery from './MemoGallery';

// Custom MemoEntry class to store information surrounding a "memo" on firestore
class MemoEntry {
    constructor(time, title, content) {
        this.time = time;
        this.title = title;
        this.content = content;
    }

    toString() {
        return this.time + ": [" + this.title + "] " + this.content;
    }
}

// Input field to add a new memo for the user
class NewMemoBox extends Component {

    constructor() {
        super();
        this.state = { // time is given internally
            title: "",
            content: ""
        };

        // have our own memoGallery for easy refreshing
        this.memoGallery = new MemoGallery();
    }

    // Keep user input updated
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Submit memo information to firestore
    addMemo = e => {

        // Converter to convert the custom MemoEntry object
        var memoEntryConverter = {
            toFirestore: function(memoEntry) {
                return {
                    time: memoEntry.time,
                    title: memoEntry.title,
                    content: memoEntry.content
                };
            },
            fromFireStore: function(snapshot, options) {
                const data = snapshot.data(options);
                return new MemoEntry(data.time, data.title, data.content);
            }
        };

        // Add time stamp
        const secSinceEpoch = new Date().getTime().toString();

        e.preventDefault();
        if(this.state.title !== "" || this.state.content !== "") { // prevent empty memos

            const db = firebase.firestore();
            const memoEntry = new MemoEntry(
                secSinceEpoch,
                this.state.title === "" ? "Untitled" : this.state.title, // fill in empty fields
                this.state.content === "" ? "No content" : this.state.content);

            const _ = db.collection("journals-library")
                .doc(this.props.userCredential.uid)
                .collection("text")
                .doc(secSinceEpoch)
                .withConverter(memoEntryConverter)
                .set(memoEntry);
        }

        // Reset state value and form 
        this.setState({
            title: "",
            content: "" 
        });
        var form = document.getElementById("add-memo-box");
        form.reset();

        // refresh memo gallery to display latest memo addition
        this.memoGallery.getData(this.props.userCredential.uid);
    }

    // Render input fields
    render() {
        
        return (
            <div>
                <form id="add-memo-box" onSubmit={this.addMemo}>
                    <input 
                     type="text"
                     name="title"
                     placeholder="Memo title"
                     onChange={this.updateInput}
                    />
                    <input 
                     type="text"
                     name="content"
                     placeholder="Type your memo here"
                     onChange={this.updateInput}
                    />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}

export default NewMemoBox;
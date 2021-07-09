import React, {Component} from 'react';
import firebase from './firebase.utils';

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
class NewMemoBox extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            content: ""
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addMemo = e => {
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

        const secSinceEpoch = new Date().getTime().toString();
        const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;

        e.preventDefault();
        if(this.state.title !== "" || this.state.content !== "") { // prevent empty memos

            const db = firebase.firestore();
            const memoEntry = new MemoEntry(
                serverTimeStamp,
                this.state.title === "" ? "Untitled" : this.state.title,
                this.state.content === "" ? "No content" : this.state.content);

            const userRef = db.collection("journals-library")
                .doc(this.props.userCredential.uid)
                .collection("text")
                .doc(secSinceEpoch)
                .withConverter(memoEntryConverter)
                .set(memoEntry);
        }

        // Reset state value and form 
        this.setState({
            content: "" 
        });
        var form = document.getElementById("add-memo-box");
        form.reset();
    }

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
};

export default NewMemoBox;
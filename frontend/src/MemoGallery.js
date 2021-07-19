import React, {Component} from 'react';
import firebase from './firebase.utils';
import Grid from './MemoGrid';

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
            content: "",
            memosArray:[]
        };
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
                .doc(localStorage.getItem('uid'))
                .collection("text")
                .doc(secSinceEpoch)
                .withConverter(memoEntryConverter)
                .set(memoEntry);
        }

        // Display the card in the gallery
        this.renderNewCard(secSinceEpoch, this.state.title, this.state.content);

        // Reset state value and form 
        this.setState({
            title: "",
            content: "" 
        });
        var form = document.getElementById("memos-add-box");
        form.reset();
    }

    deleteCard(secSinceEpoch) {
        console.log("Attempting to delete a card");
        console.log(secSinceEpoch);
        // console.log(this.state.memosArray);
        // var toDelete = -1;
        // for(var i = 0; i < this.state.memosArray.length; i++) {
        //     if(this.state.memosArray[i].time == secSinceEpoch) {
        //         toDelete = i;
        //     }
        // }
        // console.log("Deleting card with title: " + this.state.memosArray[toDelete].title);
        // this.state.memosArray.splice(toDelete, 1);
        var toDelete = document.getElementById(secSinceEpoch);
        toDelete.remove();

        
        // remove it from firestore database
        const db = firebase.firestore();
        const _ = db.collection("journals-library")
            .doc(localStorage.getItem('uid'))
            .collection("text")
            .doc(secSinceEpoch)
            .delete();
    }

    renderNewCard(time, title, content) {
        var props = {time:time, title:title, content:content};
        let dummy = document.createElement("div");
        dummy.textContent = " ";
        dummy.id = "dummy";
        var gallery = document.querySelector(".grid");
        if(!gallery.firstChild) {
            gallery.appendChild(dummy);
        }
        gallery.insertBefore(dummy, gallery.firstChild)
        this.state.memosArray.unshift(props);
        this.setState({memosArray:this.state.memosArray});

        // Give the new card a chance to load beofre removing the dummy, faking an "animation"
        setTimeout(()=>{gallery.removeChild(dummy)}, 100);
    }

    // Once the component mounts, get the data and start rendering
    componentDidMount() {
        this.getData(localStorage.getItem('uid'));
    }

    getData(uid) {
        const db = firebase.firestore();
        db.collection("journals-library")
            .doc(uid)
            .collection("text")
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var data = doc.data();
                    this.renderNewCard(data.time, data.title, data.content);
                });
            });
        
        this.render();

    }

    // Render input fields
    render() {
        
        if(this.state.memosArray.length < 0) {
            return(
            <div id="memo-page">
                <form id="memos-add-box" onSubmit={this.addMemo}>
                    <input 
                    type="text"
                    name="title"
                    placeholder="Memo title"
                    onChange={this.handleInputChange}
                    />
                    <input 
                    type="text"
                    name="content"
                    placeholder="Type your memo here"
                    onChange={this.handleInputChange}
                    />
                    <input type="submit" value="Submit"></input>
                </form>
                <span>No Memos yet. Loading...</span>
            </div>);
        } else {
            return (
                <div id="memo-page">
                <div>
                    <form id="memos-add-box" onSubmit={this.addMemo}>
                        <input 
                        type="text"
                        name="title"
                        placeholder="Memo title"
                        onChange={this.handleInputChange}
                        />
                        <input 
                        type="text"
                        name="content"
                        placeholder="Type your memo here"
                        onChange={this.handleInputChange}
                        />
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
                <div id="memoGallery">
                    <Grid memos={this.state.memosArray} onDelete={this.deleteCard} />
                </div>
                </div>
            );
        }
    }
}

export default NewMemoBox;
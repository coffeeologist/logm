import React, {Component} from 'react';
import firebase from './firebase.utils';
import Grid from './MemoGrid';

import ReactDom from 'react-dom';
import Popup from 'react-popup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MemoNewEntryForm from './MemoNewEntryForm';

import icon from './img/memo_add_icon.PNG';

// Custom MemoEntry class to store information surrounding a "memo" on firestore
class MemoEntry {
    constructor(time, title, content, badge1, badgeColor1, badge2, badgeColor2, badge3, badgeColor3, badge4, badgeColor4) {
        this.time = time;
        this.title = title;
        this.content = content;
        this.badges = [];
        // this.badge1 = badge1;
        // this.badgeColor1 = badgeColor1;
        // this.badge2 = badge2;
        // this.badgeColor2 = badgeColor2;
        // this.badge3 = badge3;
        // this.badgeColor3 = badgeColor3;
        // this.badge4 = badge4;
        // this.badgeColor4 = badgeColor4;
    }

    toString() {
        return this.time + ": [" + this.title + "] ";
    }
}

// Input field to add a new memo for the user
class NewMemoBox extends Component {

    constructor() {
        super();
        this.state = { // time is given internally
            title: "",
            content: "",
            badges: [],
            // badge1: "",
            // badgeColor1: "",
            // badge2: "",
            // badgeColor2: "",
            // badge3: "",
            // badgeColor3: "",
            // badge4: "",
            // badgeColor4:"",
            memosArray:[],
        };
    }

    // Keep user input updated
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Exclusive use by the MemoNewEntryForm to copy over all the values the user entered
    updateStateWithFormValue = (newValues) => {
        this.setState({
            title: newValues.title, 
            content: newValues.content, 
            badges: newValues.badges,
            // badge1:newValues.badge1, 
            // badgeColor1:newValues.badgeColor1,
            // badge2:newValues.badge2, 
            // badgeColor2:newValues.badgeColor2,
            // badge3:newValues.badge3, 
            // badgeColor3:newValues.badgeColor3,
            // badge4:newValues.badge4, 
            // badgeColor4:newValues.badgeColor4,
        }, function() {
            this.addMemo();
        });
    }

    // Wrapper to prevent the form from refereshing the whole page
    addMemoOnSubmit = (event) => {
        event.preventDefault();
        this.addMemo();
    }

    // Submit memo information to firestore
    addMemo = () => {
        // Converter to convert the custom MemoEntry object
        var memoEntryConverter = {
            toFirestore: function(memoEntry) {
                return {
                    time: memoEntry.time,
                    title: memoEntry.title,
                    content: memoEntry.content,
                    badges: memoEntry.badges,
                    // badge1: memoEntry.badge1,
                    // badgeColor1: memoEntry.badgeColor1,
                    // badge2: memoEntry.badge2,
                    // badgeColor2: memoEntry.badgeColor2,
                    // badge3: memoEntry.badge3,
                    // badgeColor3: memoEntry.badgeColor3,
                    // badge4: memoEntry.badge4,
                    // badgeColor4: memoEntry.badgeColor4,
                };
            },
            fromFireStore: function(snapshot, options) {
                const data = snapshot.data(options);
                return new MemoEntry(data.time, data.title, data.content, data.badges); //data.badge1, data.badgeColor1, data.badge2, data.badgeColor2, data.badge3, data.badgeColor3, data.badge4, data.badgeColor4);
            }
        };

        // Add time stamp
        const secSinceEpoch = new Date().getTime().toString();

        if(this.state.title !== "" || this.state.content !== "") { // prevent empty memos
            const db = firebase.firestore();
            const memoEntry = new MemoEntry(
                secSinceEpoch,
                this.state.title === "" ? "Untitled" : this.state.title, // fill in empty fields
                this.state.content === "" ? "No content" : this.state.content,
                this.state.badges);
                // this.state.badge1,
                // this.state.badgeColor1,
                // this.state.badge2,
                // this.state.badgeColor2,
                // this.state.badge3,
                // this.state.badgeColor3,
                // this.state.badge4,
                // this.state.badgeColor4);

            const _ = db.collection("journals-library")
                .doc(localStorage.getItem('uid'))
                .collection("text")
                .doc(secSinceEpoch)
                .withConverter(memoEntryConverter)
                .set(memoEntry);
        }

        // Display the card in the gallery + add it to state.memosArray
        this.renderNewCard(secSinceEpoch, this.state.title === "" ? "Untitled" : this.state.title, this.state.content === "" ? "No content" : this.state.content, this.state.badges); // this.state.badge1, this.state.badgeColor1, this.state.badge2, this.state.badgeColor2, this.state.badge3, this.state.badgeColor3, this.state.badge4, this.state.badgeColor4, false);

        // Reset state value and form 
        this.setState({
            title: "",
            content: "",
            badges: "",
            // badge1: "",
            // badgeColor1: "",
            // badge2: "",
            // badgeColor2: "",
            // badge3: "",
            // badgeColor3: "",
            // badge4: "",
            // badgeColor4:""
        });

        // reset the quick add box's values
        var quickAddForm = document.getElementById("memos-quick-add-form");
        quickAddForm.reset();
    }

    deleteCard(obj, arr, secSinceEpoch) {
        // find it and remove it locally in html
        var toDelete = document.getElementById(secSinceEpoch);
        toDelete.remove();

        // remove it form the memosArray
        var index = -1;
        for(var i = 0; i<arr.length; i++) {
            if(arr[i].time === secSinceEpoch) {
                index = i;
            }
        }
        arr.splice(index, 1);
        
        // remove it from firestore database
        const db = firebase.firestore();
        const _ = db.collection("journals-library")
            .doc(localStorage.getItem('uid'))
            .collection("text")
            .doc(secSinceEpoch)
            .delete();
    }

    addToMemosArray = (memo) => {
        var clonedArray = JSON.parse(JSON.stringify(this.state.memosArray));
        clonedArray.unshift(memo);
        this.state.memosArray.unshift(memo);
        this.setState({memosArray:clonedArray});
    }

    // Render new card + add it to the state (the change in state will trigger re-render)
    renderNewCard(time, title, content, badges) { //badge1, badgeColor1, badge2, badgeColor2, badge3, badgeColor3, badge4, badgeColor4, isInitial) {
        var memo = {time:time, title:title, content:content, badges: badges}; //badge1:badge1, badgeColor1:badgeColor1, badge2:badge2, badgeColor2:badgeColor2, badge3:badge3, badgeColor3:badgeColor3, badge4:badge4, badgeColor4:badgeColor4};

        let dummy = document.createElement("div");
        var gallery = document.querySelector(".grid");

        if(isInitial) { // initial load of ALL cards upon entering the page
            // Add it to the array first
            this.addToMemosArray(memo);

        } else { // Adding an individual card 
            setTimeout(() =>{
                dummy.textContent = " ";
                dummy.id = "dummy";
                if(!gallery.firstChild) { gallery.appendChild(dummy); }
                gallery.insertBefore(dummy, gallery.firstChild)
            }, 0);
            setTimeout(()=> { this.addToMemosArray(memo) }, 250)
        }
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
                var timer = 0;
                querySnapshot.forEach((doc) => {
                    var data = doc.data();
                    setTimeout(() => {
                        
                    this.renderNewCard(data.time, data.title, data.content, data.badges); // data.badge1, data.badgeColor1, data.badge2, data.badgeColor2, data.badge3, data.badgeColor3, data.badge4, data.badgeColor4, true);
                    }, timer);
                    timer += 50;
                });
            });
        
        this.render();
    }

    // Bring a pop window to allow user to put in memo entry details
    newMemoPopUp(update, addMemo) {
        Popup.registerPlugin('prompt', function (update, addMemo) {
            var form = new MemoNewEntryForm();
            this.create({
                title: 'New memo entry',
                content: form.render(),
                buttons: {
                    left: ['cancel'],
                    right: [{
                        text: 'Save',
                        key: '⌘+s',
                        className: 'success',
                        action: function () {
                            update(form.getValues());
                            Popup.close();
                        }
                    }]
                }
            });
        });
        Popup.plugins().prompt(update, addMemo);
    }

    // Render input fields
    render() {
        if(this.state.memosArray.length < 0) { //TODO
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
                <Form className="mt-3 mb-4" id="memos-quick-add-form" onSubmit={this.addMemoOnSubmit}>
                    <Row>
                        <img src={icon} id="memos-new-memo-icon" />
                        <Form.Control size="lg" type="text" name="title" placeholder="Quick Add. Type your memo title and hit ENTER." id="memos-quick-add-input" onChange={this.handleInputChange}/>
                        <Button size="lg" id="memos-new-memo-button" onClick={()=>this.newMemoPopUp(this.updateStateWithFormValue, this.addMemo)}> New memo </Button>
                    </Row>
                    </Form>
                <div id="memoGallery">
                    <Grid memos={this.state.memosArray} key={this.state.memosArray.length} onDelete={(sec) => this.deleteCard(this, this.state.memosArray, sec)} />
                </div>
                </div>
            );
        }
    }
}

export default NewMemoBox;
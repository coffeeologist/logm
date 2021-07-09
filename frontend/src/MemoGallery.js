import React, {Component} from 'react';
import firebase from './firebase.utils';

// Displays the memos of a user
class MemoGallery extends Component {
    constructor() {
        super();
    }

    // Once the component mounts, get the data and start rendering
    componentDidMount() {
        this.getData(this.props.userCredential.uid);
    }

    // Renders individual entry by making it a li and adding it to a ul
    renderEntry(doc) {
        const memoGallery = document.querySelector('#memoGallery');

        // Make li component
        let li = document.createElement('li');
        li.id = doc.id;
        let title = document.createElement('span');
        
        // Format the string
        var d = new Date(parseInt(doc.data().time));
        title.textContent = "[" + d.toString() + "] " + doc.data().title + " - " + doc.data().content;

        // Add li to bigger ul
        li.appendChild(title);
        memoGallery.insertBefore(li, memoGallery.firstChild); // insertBefore for reverse order
    }

    // Retrieve data from firestore
    getData(uid) {
        const db = firebase.firestore();

        // clear out gallery
        const memoGallery = document.getElementById('memoGallery');
        while(memoGallery.hasChildNodes()) {
            memoGallery.removeChild(memoGallery.childNodes[0]);
        }

        // Get snapshot and render each document(memoEntry)
        db.collection("journals-library")
            .doc(uid)
            .collection("text")
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                 console.log(doc.id, " => ", doc.data());
                 this.renderEntry(doc);
                });
            });
        this.render();
    }

    // Template ul named "memoGallery" to be filled in by renderEntry() later
    render() { 
        
        return (
            <div>
                <ul id="memoGallery">
                </ul>
            </div>
        );
    }
}

export default MemoGallery;
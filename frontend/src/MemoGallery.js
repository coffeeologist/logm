import React, {Component} from 'react';
import firebase from './firebase.utils';

class MemoGallery extends Component {
    constructor() {
        super();
        // this.state.entries = ["hello"]
    }

    componentDidMount() {
        this.getData(this.props.userCredential.uid);
    }

    renderEntry(doc) {
        // empty out the gallery first
        const memoGallery = document.querySelector('#memoGallery');

        // if(!document.getElementById(doc.id)) {
            console.log(doc.data().title);
            let li = document.createElement('li');
            li.id = doc.id;
            let title = document.createElement('span');
            
            var d = new Date(parseInt(doc.data().time));

            title.textContent = "[" + d.toString() + "] " + doc.data().title + " - " + doc.data().content;
            li.appendChild(title);
            console.log("Firstchild: " + (memoGallery.firstChild ? memoGallery.firstChild.textContent : "none"));
            memoGallery.insertBefore(li, memoGallery.firstChild);
        // }
    }

    getData(uid) {
        console.log("GetData is called.");
        const db = firebase.firestore();

        // clear out gallery
        const memoGallery = document.getElementById('memoGallery');
        while(memoGallery.hasChildNodes()) {
            memoGallery.removeChild(memoGallery.childNodes[0]);
        }

        var docArray = db.collection("journals-library")
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

    render() { 
        
        return (
            <div>
                <ul id="memoGallery">
                </ul>
            </div>
        );
    }
};

export default MemoGallery;
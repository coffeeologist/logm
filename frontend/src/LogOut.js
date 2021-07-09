import React from 'react';
import firebase from 'firebase';

// Wrapper for firebase function to signout
const logOutUser = () => {
    firebase.auth().signOut();
};

// Log out button
const LogOut = () => {
    return <button onClick={logOutUser} children="Log Out" />;
};

export default LogOut;
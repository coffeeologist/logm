import React from 'react';
import firebase from 'firebase';

import { withRouter } from "react-router-dom";

// Wrapper for firebase function to signout

// class LogOut extends React.Component {

//     componentDidMount = e => {
//         firebase.auth().signOut();
//         this.props.history.push('/login');
//     }

//     render() {
//         return (
//             <div>
//                 Logging out...
//             </div>
//         );
//     }
// }

// export default withRouter(LogOut);



// Wrapper for firebase function to signout
const logOutUser = () => {
    localStorage.removeItem('isAuth');
    console.log("LOG OUT JUST REMOVED ISAUTH");
    firebase.auth().signOut();
    this.props.history.push('/login');
};

// Log out button
const LogOut = () => {
    return <button onClick={logOutUser} children="Log Out" />;
};

export default withRouter(LogOut);
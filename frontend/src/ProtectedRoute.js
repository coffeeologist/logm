import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Protected routes for pages that require authentication
const ProtectedRoute = ({ component: Component, authenticated, userCredential, ...rest}) => {
    var localAuth = localStorage.getItem('isAuth');
    console.log("From ProtectedRoute: " + localAuth);
    return <Route render={(props) => 
        (localAuth ? <Component userCredential={userCredential} authenticated={authenticated} {...props} /> : <Redirect to="/login" />)}
        {...rest} />;
};

export default ProtectedRoute;
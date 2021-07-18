import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Protect the login/registration screen from showing when already logged in
const ReverseProtectedRoute = ({ component: Component, authenticated, userCredential, ...rest}) => {
    var localAuth = localStorage.getItem('authenticated');
    return <Route render={(props) => 
        (!localAuth ? <Component {...props} /> : <Redirect to="/dashboard" />)} 
        {...rest} />;
};

export default ReverseProtectedRoute;
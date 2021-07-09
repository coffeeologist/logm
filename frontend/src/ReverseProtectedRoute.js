import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Protect the login/registration screen from showing when already logged in
const ReverseProtectedRoute = ({ component: Component, authenticated, userCredential, ...rest}) => {
    return <Route render={(props) => 
        (!authenticated ? <Component {...props} /> : <Redirect to="/dashboard" />)} 
        {...rest} />;
};

export default ReverseProtectedRoute;
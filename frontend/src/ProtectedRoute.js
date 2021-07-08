import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({ component: Component, authenticated, userCredential, ...rest}) => {
 return <Route render={(props) => (authenticated ? <Component userCredential={userCredential} authenticated={authenticated} {...props} /> : <Redirect to="/login" />)} {...rest} />;
};
export default ProtectedRoute;
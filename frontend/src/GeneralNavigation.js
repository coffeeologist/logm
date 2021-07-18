import React, {Component} from 'react'; 
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import ProtectedRoute from './ProtectedRoute';
import ReverseProtectedRoute from './ReverseProtectedRoute';
import ProtectedNavigation from './ProtectedNavigation';

// General Navigation responsible for redirecting pages that doesn't require authentication (home, login, register)
class GeneralNavigation extends Component {
    render() { 
        return(
        <div>
        <Router>
        {/* Routes and redirects to different paths */}
        <Switch>
            <ReverseProtectedRoute authenticated={this.props.authenticated} path="/login" component={Login} />
            <ReverseProtectedRoute authenticated={this.props.authenticated} path="/register" component={Register} />
            <Route authenticated={this.props.authenticated} path="/" component={HomePage} />
            {/* Direct to the ProtectedRoute set of pages */}
            <ProtectedRoute authenticated={this.props.authenticated} userCredential={this.props.userCredential} path="/dashboard" component={ProtectedNavigation} />
        </Switch>
        </Router>
        </div>
    );} 
}

export default GeneralNavigation;
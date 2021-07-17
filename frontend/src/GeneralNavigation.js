import React, {Component} from 'react'; 
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import ProtectedRoute from './ProtectedRoute';
import ReverseProtectedRoute from './ReverseProtectedRoute';
import ProtectedNavigation from './ProtectedNavigation';

class GeneralNavigation extends Component {
    // home page accessible to both normal users and logged in users
    render() { 
        return(
        <div>
        <Router>
        {/* Routes and redirects to different paths */}
        <Switch>
            <ReverseProtectedRoute authenticated={this.props.authenticated} path="/login" component={Login} />
            <ReverseProtectedRoute authenticated={this.props.authenticated} path="/register" component={Register} />
            <ProtectedRoute authenticated={this.props.authenticated} userCredential={this.props.userCredential} path="/dashboard" component={ProtectedNavigation} />
            <Route authenticated={this.props.authenticated} path="/" component={HomePage} />
        </Switch>
        </Router>
        </div>
    );} 
}

export default GeneralNavigation;
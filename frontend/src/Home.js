import React, {Component} from 'react'; 
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import ReverseProtectedRoute from './ReverseProtectedRoute';
import Navigation from './Navigation';

class Home extends Component {

    // home page accessible to both normal users and logged in users
    render() { 
        return(
        <Router>
        <div>
            <Navigation authenticated={this.props.authenticated} userCredential={this.props.userCredential} />
        </div>

        {/* Routes and redirects to different paths */}
        <Switch>
            <ReverseProtectedRoute authenticated={this.props.authenticated} path="/login" component={Login} />
            <ReverseProtectedRoute authenticated={this.props.authenticated} path="/register" component={Register} />
            <ProtectedRoute authenticated={this.props.authenticated} userCredential={this.props.userCredential} path="/dashboard" component={Dashboard} />
        </Switch>
        </Router>
    );} 
}

export default Home;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

// Import each component
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import ReverseProtectedRoute from './ReverseProtectedRoute';
import LogOut from './LogOut';

// Navigation bar that differentiates between authenticated users vs not and display
// contents accordingly
class Navigation extends Component {
    render() {
        return (
            <Router>
            <div>
                    <NavLink to="/">Home</NavLink> 

                    {this.props.authenticated ? ( 
                        // Authenticated content
                        <span>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <LogOut />
                        </span>
                    ) : (

                        // Unauthenticated content
                        <span>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Register</NavLink>
                        </span>
                    )}
            </div>

            {/* Routes and redirects to different paths */}
            <Switch>
                <Route exact path="/" component={Home} />
                <ReverseProtectedRoute authenticated={this.props.authenticated} path="/login" component={Login} />
                <ReverseProtectedRoute authenticated={this.props.authenticated} path="/register" component={Register} />
                <ProtectedRoute authenticated={this.props.authenticated} userCredential={this.props.userCredential} path="/dashboard" component={Dashboard} />
            </Switch>
            </Router>
        );
    }
}

export default Navigation;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'

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
  showSettings (event) {
    event.preventDefault();
  }

    render() {
        return (
            <Menu  id="navigation-sidebar">
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
            </Menu>
            // {/* Routes and redirects to different paths */}
            // <Router>
            // <Switch>
            //     <Route exact path="/" component={Home} />
            //     <ReverseProtectedRoute authenticated={this.props.authenticated} path="/login" component={Login} />
            //     <ReverseProtectedRoute authenticated={this.props.authenticated} path="/register" component={Register} />
            //     <ProtectedRoute authenticated={this.props.authenticated} userCredential={this.props.userCredential} path="/dashboard" component={Dashboard} />
            // </Switch>
            // </Router>
        );
    }
}

export default Navigation;
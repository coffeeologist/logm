import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, withRouter } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'

// Import each component
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import ReverseProtectedRoute from './ReverseProtectedRoute';
import LogOut from './LogOut';

// Navigation bar that differentiates between authenticated users vs not and display
// contents accordingly
class ProtectedNavigation extends Component {
  showSettings (event) {
    event.preventDefault();
  }

    render() {
        const items = [
          <a key="0" href="">
            <i class="fa fa-adjust" aria-hidden="true"></i>
            <span>Favorites</span>
          </a>,
          <a key="1" href="">
            <i className="fa fa-fw fa-bell-o" />
            <span>Alerts</span>
          </a>,
          <a key="2" href="">
            <i className="fa fa-fw fa-envelope-o" />
            <span>Messages</span>
          </a>,
          <a key="3" href="">
            <i className="fa fa-fw fa-comment-o" />
            <span>Comments</span>
          </a>,
          <a key="4" href="">
            <i className="fa fa-fw fa-bar-chart-o" />
            <span>Analytics</span>
          </a>,
          <a key="5" href="">
            <i className="fa fa-fw fa-newspaper-o" />
            <span>Reading List</span>
          </a>
        ];
        return (
            
        <div>
        <Router>
            <Menu disableAutoFocus id="navigation-sidebar">
                {/* <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
                {items}
            </Menu>
        <div>
        </div>

        {/* Routes and redirects to different paths */}
        <Switch>
            <ReverseProtectedRoute authenticated={this.props.authenticated} path="/login" component={Login} />
            <ReverseProtectedRoute authenticated={this.props.authenticated} path="/register" component={Register} />
            <ProtectedRoute authenticated={this.props.authenticated} userCredential={this.props.userCredential} path="/dashboard" component={Dashboard} />
            <Route authenticated={this.props.authenticated} path="/" component={HomePage} />
        </Switch>
        </Router>
        </div>
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

export default withRouter(ProtectedNavigation);
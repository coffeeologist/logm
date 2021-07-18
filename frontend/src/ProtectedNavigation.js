import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import Image from 'react-bootstrap/Image';

// Import each component
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import ReverseProtectedRoute from './ReverseProtectedRoute';

import lightIcon from './img/logo_light_cropped.png';

// Protected Navigation that's in charge of redirection authenticatoin-required pages
class ProtectedNavigation extends Component {

    state = {         // List of side bar options
        items: [
          <a key="0" href="/dashboard">
            <i class="fa fa-fw fa-sticky-note-o"></i>
            <span>Memos</span>
          </a>,
          <a key="1" href="/">
            <i className="fa fa-fw fa-clock-o" />
            <span>Timeline</span>
          </a>,
          <a key="2" href="">
            <i className="fa fa-fw fa-th-large" />
            <span>Gallery</span>
          </a>,
          <a key="3" href="">
            <i className="fa fa-fw fa-check-square-o" />
            <span>Todo list</span>
          </a>,
    ]};

    render() {
        return (
            
        <div>
        <Router>
            <Menu disableAutoFocus id="navigation-sidebar" customCrossIcon={ false }>
                <div id="sidebar-header">
                  <div id="sidebar-header-inner-wrapper">
                    <Image src={lightIcon} id="sidebar-logo"/> Hi, insertName
                  </div>
                </div>

                {this.state.items}

                <div className="divider"><p></p></div>
                <a key="4" href="/">
                  <i className="fa fa-fw fa-home" />
                  <span>Home</span>
                </a>
                <a key="5" href="/">
                  <i className="fa fa-fw fa-sign-out" />
                  <span>Sign out</span>
                </a>
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
        );
    }
}

export default withRouter(ProtectedNavigation);
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

import { BrowserRouter as Route, Switch, withRouter } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import firebase from 'firebase';

import Image from 'react-bootstrap/Image';

// Import each component
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Memos from './Memos';

import lightIcon from './img/logo_light_cropped.png';

// Protected Navigation that's in charge of redirection authenticatoin-required pages
class ProtectedNavigation extends Component {

    state = {         // List of side bar options
        items: [
          <a key="0" href="/dashboard">
            <i className="fa fa-fw fa-home"></i>
            <span>Dashboard</span>
          </a>,
          <a key="0" href="/memos">
            <i className="fas fa-fw fa-sticky-note"></i>
            <span>Memos</span>
          </a>,
          <a key="1" href="/dummy">
            <i className="fas fa-fw fa-clock" />
            <span>Timeline</span>
          </a>,
          <a key="2" href="">
            <i className="fas fa-fw fa-th-large" />
            <span>Gallery</span>
          </a>,
          <a key="3" href="">
            <i className="fas fa-fw fa-check-square" />
            <span>Todo list</span>
          </a>,
          <a key="4" href="">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </a>,
    ]};

    logOutUser = () => {
        firebase.auth().signOut();

        // Remove authentication related info
        localStorage.removeItem('authenticated');
        localStorage.removeItem('email');
        localStorage.removeItem('uid');

        // Redirect back to the login
        this.props.history.push('/login');
    };

    render() {
        return (
            
        <div>
        {/* <Router> */}
            <Popup/>
            <Menu disableAutoFocus id="navigation-sidebar" customCrossIcon={ false }>
                <div id="sidebar-header">
                  <div id="sidebar-header-inner-wrapper">
                    <Image src={lightIcon} id="sidebar-logo"/> Hi, insertName
                  </div>
                </div>

                {this.state.items}

                <div className="divider"><p></p></div>
                <a key="5" href="/">
                  <i className="fa fa-fw fa-info-circle" />
                  <span>Logm splash page</span>
                </a>
                <a key="6" id="sidebar-logout-button" onClick={this.logOutUser}>
                  <i className="fas fa-fw fa-sign-out-alt" />
                  <span>Sign out</span>
                </a>
            </Menu>

        {/* Routes and redirects to different paths */}
        <Switch>
            <ProtectedRoute authenticated={this.props.authenticated} userCredential={this.props.userCredential} path="/memos" component={Memos}/>
            <ProtectedRoute authenticated={this.props.authenticated} userCredential={this.props.userCredential} path="/dashboard" component={Dashboard} />
            <Route authenticated={this.props.authenticated} userCredential={this.props.userCredential} path="/" exact component={HomePage} />
        </Switch>
        {/* </Router> */}
        </div>
        );
    }
}

export default withRouter(ProtectedNavigation);
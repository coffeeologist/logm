import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'

// Import each component
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import ReverseProtectedRoute from './ReverseProtectedRoute';

// Protected Navigation that's in charge of redirection authenticatoin-required pages
class ProtectedNavigation extends Component {

    state = {         // List of side bar options
        items: [
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
    ]};

    render() {
        return (
            
        <div>
        <Router>
            <Menu disableAutoFocus id="navigation-sidebar">
                {this.state.items}
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
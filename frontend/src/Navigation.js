import React, { Component } from 'react';
// import { Row } from 'rebass';
// import { Column } from 'rebass';
// import {Tiles} from 'rebass/layout';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import ReverseProtectedRoute from './ReverseProtectedRoute';
import LogOut from './LogOut';
class Navigation extends Component {
 render() {
   return (
     <Router>
       <div>
             <NavLink to="/">Home</NavLink>
             {this.props.authenticated ? (
               <span>
                 <NavLink to="/dashboard">Dashboard</NavLink>
                 <LogOut />
               </span>
             ) : (
               <span>
                 <NavLink to="/login">Login</NavLink>
                 <NavLink to="/register">Register</NavLink>
               </span>
             )}

       </div>
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
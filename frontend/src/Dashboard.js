import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import Clock from 'react-live-clock';

// Main dashboard for each user
class Dashboard extends Component {
    componentDidMount = e => {
        // Change background splash
        document.body.style.backgroundColor = "#6B705C"
        document.body.style.overflow = "hidden";
    }

 render() {
    return (
        // TODO: time zone selection
        <div id="dashboard">
            <Clock className="dashboard-clock" format={'HH:mm:ss a'} ticking={true} timezone={"America/New_York"}/>
            <Clock className="dashboard-sub-clock" format={'dddd · MMMM Do, YYYY'} ticking={false} timezone={"America/New_York"}/>
            <h2 id="dashboard-welcome-message">Welcome to logm, localStorage.getItem('name');! Have a great day :)</h2>

        </div>
    );
    }
}

export default withRouter(Dashboard);
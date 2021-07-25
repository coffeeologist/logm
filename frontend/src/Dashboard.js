import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import Clock from 'react-live-clock';

// Main dashboard for each user
class Dashboard extends Component {
    componentDidMount = e => {
        // Change background splash
        document.body.style.backgroundColor = "#6B705C"
        document.body.style.overflow = "hidden";

        // hide the scroll bar
        document.getElementById("main-scrollbar").visibility = "hidden";
    }

    componentWillUnmount = e => {
        // Revert it back to normal
        document.body.style.backgroundColor = "transparent";
        document.body.style.overflow = "auto";

        // bring scroll back
        document.getElementById("main-scrollbar").visibility = "visible";
    }
 render() {
    return (
        // TODO: time zone selection
        <div id="dashboard">
            <Clock className="dashboard-clock" format={'HH:mm:ss a'} ticking={true} timezone={"America/New_York"}/>
            <Clock className="dashboard-sub-clock" format={'dddd · MMMM Do, YYYY'} ticking={false} timezone={"America/New_York"}/>
            <h2 id="dashboard-welcome-message">Welcome to logm, localStorage.getItem('name');! Have a great day :)</h2>

            <div id="wave-animation">
                {/* Credit to: https://www.csscodelab.com/water-effect-simple-css-wave-animation/ */}
                <div>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,232,214,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,232,214,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,232,214,0.7)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,232,214,0.9)" />
                </g>
                </svg>
                </div>
            </div>
        </div>
    );
    }
}

export default withRouter(Dashboard);
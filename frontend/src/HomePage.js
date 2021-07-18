import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

// Home page that everyone can access. 
class HomePage extends Component {

    render() {
        return (
                <div> {/* Div warpper for animation */}
                This is HomePage. Splash here. 
                        <NavLink to="/login">
                            Get Started
                        </NavLink>

                    <div>
                        Sections of feature showcase
                    </div>

                    <div>
                        About / author section
                    </div>

                    <div>
                        Another get started / ender
                    </div>

                    <div>
                        Footnotes
                    </div>
                </div>
        );
    }
}

export default withRouter(HomePage);
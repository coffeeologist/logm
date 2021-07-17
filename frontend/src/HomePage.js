import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import LogOut from './LogOut';


// Animation related
import { css } from 'aphrodite';
import { styles } from './Animation';

// Login class with input fields
class HomePage extends Component {


    // Render input form
    render() {
        return (
                <div className={css(styles.fadeIn_08)}> {/* Div warpper for animation */}
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
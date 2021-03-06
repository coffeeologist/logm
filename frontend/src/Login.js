import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import firebase from './firebase.utils';
import { signInWithGoogle, signInWithGithub } from './firebase.utils.js';

// React bootstrap for formatting
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import images
import logo from './img/logo_dark.png';
import decoration from './img/login_page_decoration.png';
import googleIcon from './img/google_icon.png';
import githubIcon from './img/github_icon.jpg';

// Animation related
import { css } from 'aphrodite';
import { styles } from './Animation';

// Login class with input fields
class Login extends Component {

    // input fields and storage
    state = {
        email: '',
        password: '',
        error: null,
        userCredential: null
    };

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

    // Keep input form updated
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Submit to Firebase for authentication
    handleFormSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => { 
                // Save the user credentials as local storage key value pairs
                localStorage.setItem('authenticated', true);
                localStorage.setItem('email', user.user.email);
                localStorage.setItem('uid', user.user.uid);
                // Redirect to dashboard
                this.props.history.push('/dashboard'); })
            .catch((error) => { this.setState({ error: error }); });

        // TODO: need to figure out how to delay unmounting
        // if(!this.state.error) {
        //     document.getElementById("login-decoration-1").className = css(styles.bounceOutUp_08);
        // }
    };

    // Render input form
    render() {
        const { email, password, error } = this.state;
        return (
            <Container className="login-vertical-align-middle">
                <div className={css(styles.fadeIn_08)} id="login-center-island-wrapper"> {/* Div warpper for animation */}
                <Row className="pt-5 pb-5 mt-5" id="login-center-island">
                    {/* Logo on the left side */}
                    <Col lg={6} className="pt-5 pb-5">
                        <NavLink to="/">
                            <Image className="pt-5 pb-5 pl-5" id="login-logo" src={logo} fluid />
                        </NavLink>
                    </Col>

                    {/* Input form on the right side */}
                    <Col lg={6} className="pt-5 pb-5">
                        <Row>
                            <h1 className="mb-2 css" id="login-form-title">Log In</h1>
                        </Row>
                        <Row>
                            <Form id="login-form" onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Control type="email" name="email" value={email} placeholder="Enter email" id="login-form-email" onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" name="password" value={password} placeholder="Enter password" id="login-form-password" onChange={this.handleInputChange} />
                                </Form.Group>

                                {/* Log in button */}
                                <Button className="mb-1" type="submit" id="login-form-button" children="Log In" />
                            </Form>
                        </Row>

                        {/* error in loggin in */}
                        {/* TODO : case on error type to give better error message */}
                        <Row>
                            {error ? (
                                <p id="login-error-message">{error.message}</p>
                            ) : null}
                        </Row>

                        <Row id="login-form-alternate-provider">
                            {/* Separate sign in functionality with google account */}
                            <p id="login-form-text">
                                <NavLink to="/register" id="login-redirect" >Sign up</NavLink> 
                                &nbsp; or login with </p>
                            <Button onClick={signInWithGoogle} className="mx-1" lg="auto" id="login-form-alternate-provider-button">
                                <i class="fab fa-google fa-2x login-form-alternate-provider-icon" aria-hidden="true"></i>
                            </Button>
                            <Button onClick={signInWithGithub} className="mx-1" id="login-form-alternate-provider-button">
                                <i class="fab fa-github fa-2x login-form-alternate-provider-icon" aria-hidden="true"></i>
                            </Button>
                        </Row>

                    </Col>  
                </Row>
                </div>

                {/* Decorations */}
                <Image className={css(styles.bounceInDown_08)} id="login-decoration-1" src={decoration} />
                <Image className={css(styles.bounceInDown_12)} id="login-decoration-2" src={decoration} />
                <Image className={css(styles.bounceInDown_08)} id="login-decoration-3" src={decoration} />
                <Image className={css(styles.bounceInDown_12)} id="login-decoration-4" src={decoration} />
            </Container>
        );
    }
}

export default withRouter(Login);
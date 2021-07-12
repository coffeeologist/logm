import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import firebase from './firebase.utils';
import { signInWithGoogle } from './firebase.utils.js';

// React bootstrap for formatting
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import logo from './img/logo_dark.png';
import googleIcon from './img/google_icon.png';
import facebookIcon from './img/facebook_icon.png';
import githubIcon from './img/github_icon.jpg';

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
        // document.body.style.backgroundSize = "120%";
        // document.body.style.backgroundPosition = "center";
        // document.body.style.backgroundRepeat = "repeat-x";
        document.body.style.overflow = "hidden";
        document.getElementById("login-center-island").style.backgroundImage = "url(https://raw.githubusercontent.com/coffeeologist/logm/main/frontend/src/img/center_background.png)";
        document.getElementById("login-center-island").style.backgroundRepeat = "repeat-x";
        document.getElementById("login-center-island").style.backgroundPosition = "center";
    }

    componentWillUnmount = e => {
        // Revert it back to normal
        // document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "transparent"
    }

    // Keep input form updated
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Submit to Firebase for authentication
    handleFormSubmit = (event) => {
        console.log("Email is:");
        console.log(this.state.email);
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => { this.props.history.push('/'); })
            .catch((error) => { this.setState({ error: error }); });
    };

    // Render input form
    render() {
        const { email, password, error } = this.state;
        return (
            <Container className="login-vertical-align-middle">
                <Row className="pt-5 pb-5 mt-5" id="login-center-island">

                    {/* Logo on the left side */}
                    <Col lg={6} className="pt-5 pb-5">
                        <NavLink to="/home">
                            <Image className="pt-5 pb-5 pl-5" id="login-logo" src={logo} fluid />
                        </NavLink>
                    </Col>

                    {/* Input form on the right side */}
                    <Col lg={6} className="pt-5 pb-5">
                        <Row>
                            <h1 className="mb-1" id="login-form-title">Log In</h1>
                        </Row>
                        <Row>
                            <Form id="login-form" onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Control type="email" name="email" value={email} placeholder="Enter email" size="lg" id="login-form-email" onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" name="password" value={password} placeholder="Enter password" size="lg" id="login-form-password" onChange={this.handleInputChange} />
                                </Form.Group>

                                {/* Log in button */}
                                <Button className="mb-1" type="submit" id="login-form-button" size="lg" children="Log In" />
                            </Form>
                        </Row>

                        {/* error in loggin in */}
                        {/* TODO : case on error type to give better error message */}
                        <Row>
                            {error ? (
                                <p className="error-message">{error.message}</p>
                            ) : null}
                        </Row>

                        <Row id="login-form-alternate-provider">
                            {/* Separate sign in functionality with google account */}
                            {/* <Image /> */}
                            <p id="login-form-text">
                                <NavLink to="/register" >Sign up</NavLink> 
                                &nbsp; or login with </p>
                            <Button onClick={signInWithGoogle} className="mx-1" lg="auto" id="login-form-alternate-provider-button">
                                <Image src={googleIcon} id="login-form-alternate-provider-icon" roundedCircle/>
                            </Button>
                            <Button onClick={signInWithGoogle} className="mx-1" id="login-form-alternate-provider-button">
                                <Image src={facebookIcon} id="login-form-alternate-provider-icon" roundedCircle/>
                            </Button>
                            <Button onClick={signInWithGoogle} className="mx-1" id="login-form-alternate-provider-button">
                                <Image src={githubIcon} id="login-form-alternate-provider-icon" roundedCircle/>
                            </Button>
                        </Row>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Login);
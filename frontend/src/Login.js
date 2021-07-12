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

// import images
import logo from './img/logo_dark.png';
import loginDecoration from './img/login_page_decoration.png';
import googleIcon from './img/google_icon.png';
import facebookIcon from './img/facebook_icon.png';
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

        // Add background for center island
        document.getElementById("login-center-island").style.backgroundImage = "url(https://raw.githubusercontent.com/coffeeologist/logm/main/frontend/src/img/center_background.png)";
        document.getElementById("login-center-island").style.backgroundRepeat = "repeat-x";
        document.getElementById("login-center-island").style.backgroundPosition = "center";
    }

    componentWillUnmount = e => {
        // Revert it back to normal
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
                        <NavLink to="/home">
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
                </div>

                {/* Decorations */}
                <Image className={css(styles.bounceInDown_08)} id="login-decoration-1" src={loginDecoration} />
                <Image className={css(styles.bounceInDown_12)} id="login-decoration-2" src={loginDecoration} />
                <Image className={css(styles.bounceInDown_08)} id="login-decoration-3" src={loginDecoration} />
                <Image className={css(styles.bounceInDown_12)} id="login-decoration-4" src={loginDecoration} />
            </Container>
        );
    }
}

export default withRouter(Login);
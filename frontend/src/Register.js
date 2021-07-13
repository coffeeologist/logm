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
import logo from './img/logo_light.png';
import decoration from './img/login_page_decoration.png';
import googleIcon from './img/google_icon.png';
import githubIcon from './img/github_icon.jpg';

// Animation related
import { css } from 'aphrodite';
import { styles } from './Animation';

class Register extends Component {
    // input fields and storage
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
        userCredential: null
    };

    componentDidMount = e => {
        // Change background splash
        document.body.style.backgroundColor = "#FFE8D6"
        document.body.style.overflow = "hidden";

        // Add background for center island
        document.getElementById("register-center-island").style.backgroundImage = "url(https://raw.githubusercontent.com/coffeeologist/logm/main/frontend/src/img/register_center_background.png)";
        document.getElementById("register-center-island").style.backgroundRepeat = "repeat-x";
        document.getElementById("register-center-island").style.backgroundPosition = "center";
    }

    componentWillUnmount = e => {
        // Revert it back to normal
        document.body.style.backgroundColor = "transparent";
        document.body.style.overflow = "auto";
    }

    // Keep input form updated
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Submit to Firebase for authentication
    handleFormSubmit = (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = this.state;
        if(password !== confirmPassword) {
            var confirmPasswordError = {message: "Entered password and confirmation is inconsistent. Please double check."}
            this.setState({error: confirmPasswordError});
            return;
        }
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => { this.props.history.push('/'); })
            .catch((error) => { this.setState({ error: error }); });

        // TODO: need to figure out how to delay unmounting
        // if(!this.state.error) {
        //     document.getElementById("register-decoration-1").className = css(styles.bounceOutUp_08);
        // }
    };

    // Render input form
    render() {
        const { email, password, confirmPassword, error } = this.state;
        return (
            <Container className="register-vertical-align-middle">
                <div className={css(styles.fadeIn_08)} id="register-center-island-wrapper"> {/* Div warpper for animation */}
                <Row className="pt-5 pb-5 mt-5 pl-5 pr-5" id="register-center-island">

                    {/* Input form on the left side */}
                    <Col lg={6} className="pt-5 pb-5 pl-5">
                        <Row className="pl-5">
                            <h1 className="mb-2 css" id="register-form-title">Sign up</h1>
                        </Row>
                        <Row className="pl-5">
                            <Form id="register-form" onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Control type="email" name="email" value={email} placeholder="Enter email" id="register-form-email" onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" name="password" value={password} placeholder="Enter password" id="register-form-password" onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" name="confirmPassword" value={confirmPassword} placeholder="Re-enter password" id="register-form-confirm-password" onChange={this.handleInputChange} />
                                </Form.Group>

                                {/* Log in button */}
                                <Button className="mb-1" type="submit" id="register-form-button" children="Register" />
                            </Form>
                        </Row>

                        {/* error in loggin in */}
                        {/* TODO : case on error type to give better error message */}
                        <Row className="pl-5">
                            {error ? (
                                <p id="register-error-message">{error.message}</p>
                            ) : null}
                        </Row>

                        <Row id="register-form-alternate-provider" className="pl-5">
                            {/* Separate sign in functionality with google account */}
                            {/* <Image /> */}
                            <p id="register-form-text">
                                <NavLink to="/login" id="register-redirect" >Login</NavLink> 
                                &nbsp; or sign up with </p>
                            <Button onClick={signInWithGoogle} className="mx-1" lg="auto" id="register-form-alternate-provider-button">
                                <Image src={googleIcon} id="register-form-alternate-provider-icon" roundedCircle/>
                            </Button>
                            {/* <Button onClick={signInWithGoogle} className="mx-1" id="register-form-alternate-provider-button">
                                <Image src={facebookIcon} id="register-form-alternate-provider-icon" roundedCircle/>
                            </Button> */}
                            <Button onClick={signInWithGithub} className="mx-1" id="register-form-alternate-provider-button">
                                <Image src={githubIcon} id="register-form-alternate-provider-icon" roundedCircle/>
                            </Button>
                        </Row>

                    </Col>  

                    {/* Logo on the right side */}
                    <Col lg={6} className="pt-5 pb-5">
                        <NavLink to="/home">
                            <Image className="pt-5 pb-5 pr-3" id="register-logo" src={logo} fluid />
                        </NavLink>
                    </Col>
                </Row>
                </div>

                {/* Decorations */}
                <Image className={css(styles.bounceInDown_08)} id="register-decoration-1" src={decoration} />
                <Image className={css(styles.bounceInDown_12)} id="register-decoration-2" src={decoration} />
                <Image className={css(styles.bounceInDown_08)} id="register-decoration-3" src={decoration} />
                <Image className={css(styles.bounceInDown_12)} id="register-decoration-4" src={decoration} />
            </Container>
        );
    }
}
export default withRouter(Register);
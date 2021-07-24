import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Form from 'react-bootstrap/Form';

import darkIcon from './img/logo_dark_cropped.png';

import tempSplash from './img/splash_asset/full.png';

import memosExample from './img/memos_example.PNG';

import chairAndLamp from './img/splash_asset/chair_and_lamp.png';
import person from './img/splash_asset/person.png';
import books from './img/splash_asset/books.png';
import flyingPaper from './img/splash_asset/flying_paper.png';

//Animation 
import { css } from 'aphrodite';
import { styles } from './Animation';

// Home page that everyone can access. 
class HomePage extends Component {

    render() {
        return (

            <div id="home-page">
            <Navbar fixed="top" id="main-navbar">
                <Container>
                {/* <Navbar.Brand className="main-navbar-icon" href="#home"><Image src={darkIcon} id="navbar-brand-icon"/></Navbar.Brand> */}
                {/* <Nav> */}
                <Nav.Link className="main-navbar-item mr-3" href="#main-intro"> Home </Nav.Link>
                <Nav.Link className="main-navbar-item mr-3" href="#main-features-memos">Features</Nav.Link>
                <Nav.Link className="main-navbar-item mr-3" href="#main-demo">Demo</Nav.Link>
                <Nav.Link className="main-navbar-item mr-3" href="#main-about">About</Nav.Link>
                <Nav.Link className="main-navbar-item mr-3" href="#main-contact">Contact</Nav.Link>
                {/* </Nav> */}
                </Container>
            </Navbar>

            {/* <Image src={tempSplash} className="main-splash" /> */}
            <div>
                <Image src={books} id="main-splash-2" className={css(styles.bounceInRight_08)} />
                <Image src={chairAndLamp} id="main-splash" className={css(styles.bounceInRight_08)} />
                <Image src={person} id="main-splash" className={css(styles.bounceInDown_12)} />
                <Image src={books} id="main-splash" className={css(styles.bounceInRight_12)} />
                <Image src={flyingPaper} id="main-splash" className={css(styles.paperFlow)} />
            </div>

            <Row id="main-intro">
                <Col id="main-brand-word" className={css(styles.fadeIn_08)}>
                    <div>
                        <h1 className="inline-block" id="main-brand-title">logm.</h1> 
                        <h2 className="inline-block" id="main-brand-subtitle">Your online bullet journal.</h2>
                    </div>
                    <div>
                        <h4 id="main-brand-subsubtitle">
                            Notes. Timelines. Reminders. Memories.
                        </h4>
                        <NavLink to="/login">
                            <Button size="lg" className="ml-2" id="main-brand-get-started"> Get Started <i class="fas fa-sign-in-alt"></i> </Button>
                        </NavLink>
                    </div>
                
                    
                </Col>
                {/* <Col lg={6} id="main-brand-splash">
                </Col> */}


            </Row>





            <Row id="main-features-memos">
                <Col lg={6}>
                    <Image src={memosExample} id="main-memos-example" />
                </Col>
                <Col lg={6} id="main-memos-description">
                    <h1 id="main-memos-main-description">Memos.</h1>
                    <h2 id="main-memos-sub-description">Record entries and view them in a beautifully animated and interactive gallery.</h2>
                </Col>
            </Row>





            <Row id="main-demo">
                <Col lg={6} id="main-demo-center-island">
                    <h1 id="main-demo-form-title">Log in</h1>
                    <Form id="main-demo-form">
                        <Form.Group>
                            <i class="fas fa-user"></i>
                            <Form.Control disabled type="email" name="email" placeholder="demo@logm-project.web.app" id="main-demo-form-email" />
                        </Form.Group>
                        <Form.Group>
                            <i class="fas fa-lock"></i>
                            <Form.Control disabled type="password" name="password"placeholder="demopassword" id="main-demo-form-password" />
                        </Form.Group>
                        <NavLink to="/login">
                            <Button className="mb-1" id="main-demo-form-button" href="/login">Go to log in page <i class="fas fa-sign-in-alt"></i> </Button>
                        </NavLink>
                    </Form>
                </Col>

                <Col lg={6} id="main-demo-description">
                    <h1 id="main-demo-description-title">Demo account details</h1>
                    <p id="main-demo-description-body">Thank you so much for stopping by logm, and I am honored that you have decided to try out through a demo. This is a demo account for the purpose of showcasing logm for recruiters, future employers, and users interested in utilizing logm. <br></br> Please do not ... </p>
                    <ul id="main-demo-description-list">
                        <li>Spam the account with notes</li>
                        <li>Write inappropriate notes</li>
                        <li>Attempt to break the project in functionality or security aspects</li>
                    </ul>
                    <p id="main-demo-description-end">Thank you so much for your time and understanding.</p>
                </Col>
            </Row>




            <Row id="main-about" className="pl-5 pr-5">
                <Col lg={3}>

                <h1 id="main-about-header">Implementation <br></br> details</h1>
                </Col>
                <Col lg={9}>

                <ul className="no-bullets">
                    <li> <i class="fa fa-square" aria-hidden="true"></i> 
                        Frontend is made from scratch with <p><i class="fab fa-html5"></i>HTML</p>, <p><i class="fab fa-css3-alt"></i>CSS</p>, <p><i class="fab fa-react"></i>React JS</p>. No templates used. </li>
                    <li> <i class="fa fa-square" aria-hidden="true"></i> 
                        Packages used to animate elements include <p><i class="fas fa-code"></i>react-animations</p>, <p><i class="fas fa-code"></i>aphrodite</p></li>
                    <li> <i class="fa fa-square" aria-hidden="true"></i> 
                        Web app deployment is done through <p><i class="far fa-window-restore"></i>Firebase</p>, and user data is managed through <p><i class="fas fa-server"></i>Firestore</p> database</li>
                    <li> <i class="fa fa-square" aria-hidden="true"></i> 
                        UI design and artwork splash is drawn with <p><i class="fas fa-paint-brush"></i>Pixlr</p> and <p><i class="fas fa-palette"></i>Procreate</p></li>
                    <li> <i class="fa fa-square" aria-hidden="true"></i> 
                        The code is here on <a href="https://github.com/coffeeologist/logm"><p className="underline"><i class="fas fa-code-branch"></i>Github</p></a></li>
                </ul>
                </Col>
            </Row>





            <Row id="main-contact">
                <Col lg={12} className="text-center">
                    <h2 id="main-contact-header">Thank you for visiting logm! You can also .&nbsp;.&nbsp;. </h2>
                </Col>
                
                <Col lg={1}></Col>
                <Col lg={2} className="main-contact-section text-center">
                    <a href="https://github.com/coffeeologist/logm">
                        <i class="fab fa-github-square fa-4x"></i>
                    </a>
                    <p>File issues and view code</p>
                </Col>
                <Col lg={2} className="main-contact-section text-center">
                    <a href="https://linkedin.com/in/jiachenamyliu/">
                        <i class="fab fa-linkedin fa-4x" aria-hidden="true"></i>
                    </a>
                    <p>Connect with me</p>
                </Col>
                <Col lg={2} className="main-contact-section text-center">
                    <a href="mailto:jiachen.amy.liu@gmail.com">
                        <i class="fas fa-envelope-open-text fa-4x" aria-hidden="true"></i>
                    </a>
                    <p>Send me an email</p>
                </Col>
                <Col lg={2} className="main-contact-section text-center">
                    <a href="https://coffeeologist.github.io">
                        <i class="fas fa-laptop-code fa-4x" aria-hidden="true"></i>
                    </a>
                    <p>Visit my personal website</p>
                </Col>
                <Col lg={2} className="main-contact-section text-center">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="main-contact-phone-tooltip">443-896-3035</Tooltip>}
                    >
                        {({ ref, ...triggerHandler }) => (
                            <i {...triggerHandler} ref={ref} class="fas fa-phone-square fa-4x" aria-hidden="true"></i>
                        )}
                    </OverlayTrigger>
                    <p>Reach me over the phone</p>
                </Col>
                <Col lg={1}></Col>

                <Col lg={12} className="main-footer text-center">
                    <p>
                        Copyright &copy; 2021 &nbsp; | &nbsp; logm-project by Jiachen (Amy) Liu
                    </p>
                    <p>
                        All artwork and design is original. Please do not use or repost. 
                    </p>
                </Col>
            </Row>


            </div>
        );
    }
}

export default withRouter(HomePage);
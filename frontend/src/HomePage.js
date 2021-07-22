import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

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
                            <Button size="lg" id="main-brand-get-started"> Get Started <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i> </Button>
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
                Here are the details for the demo account. Pleaes do not abuse.
            </Row>

            <Row id="main-about">
                This is made through react js, firebase, and many packages. here's the github link
            </Row>

            <Row id="main-contact">
                You can file issues here. Find Amy here
            </Row>


            </div>
        );
    }
}

export default withRouter(HomePage);
import React, { Component } from 'react';
import './Login.css';
import { Button, Col, Image, Form, Row } from 'react-bootstrap';
import SpotifyLogo from '../../assets/Spotify-logo-green.png';

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        token: '',
        isLoggedIn: false
    }

    render() {
        return(
            <div className="col-md-8 login">
                <div className="col-md-6">
                    <p className="login-text">Log using your </p>
                    <Image src={SpotifyLogo} alt="spotify-logo" className="spotify-logo"/>
                </div>
                <div className="login-form">
                    <Form >
                        <Row className="justify-content-md-center">
                            <Col xs lg="2">
                                <Form.Control className="login-input" placeholder="username"/>
                            </Col>
                            <Col xs lg="2">
                                <Form.Control className="login-input" placeholder="password"/>
                            </Col>
                            <Col xs lg="1">
                                <Button className="btn login-button" variant="primary" size="lg" type="submit">LOGIN</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }
}
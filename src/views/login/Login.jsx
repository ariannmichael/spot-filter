import React, { Component } from 'react';
import './Login.css';
import { Button, Image } from 'react-bootstrap';
import SpotifyLogo from '../../assets/Spotify-logo-green.png';
import axios from 'axios';

export default class Login extends Component {
    componentDidMount() {
        axios.get(process.env.REACT_APP_LOGOUT)
    }
    login = () => {
        window.location.replace(process.env.REACT_APP_LOGIN)
    }

    render() {
        return(
            <div className="login">
                <div className="spotfilter-text">
                    <p className="spotfilter-text-primary">Spotfilter</p>
                    <p className="spotfilter-text-secondary">An api to filter a list of albums and artists in Spotify based in the genre. Using the Spotify's api.</p>
                </div>
                <br/>
                <div>
                    <p className="login-text">Log using your </p>
                    <Image src={SpotifyLogo} alt="spotify-logo" className="spotify-logo"/>
                
                    <div className="login-form">
                        <Button className="btn login-button" variant="outline-black" size="lg" type="submit" onClick={this.login}>LOGIN</Button>
                    </div>
                </div>
            </div>
        )
    }
}

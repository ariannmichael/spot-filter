import React, { Component } from 'react';
import './Header.css';
import { Image, ButtonToolbar, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    handleChangeSearch = event => {
        this.setState({search: event.target.value});
    }

    handleKeyPress = event => {
        if(event.key === "Enter") {            
            return <Redirect to={{ pathname: "/search", state:{genre: this.state.search} }} />
        }
    }

    render() {
        return(
            <header className="header">
                <Link to="/home">
                    <div className="heading-name">
                        <h1>Spot Filter</h1>
                    </div>
                </Link>
                <ButtonToolbar className="header-button-toolbar">
                    <Link to="/'" className="header-link"  variant="outline-none">
                        Albums
                    </Link>
                    <Link to="/" className="header-link"  variant="outline-none">
                        Artists
                    </Link>
                    <Link to="/" className="header-link"  variant="outline-none">
                        About
                    </Link>                          
                    <Form.Control className="search-form" type="text" placeholder="Search" onChange={this.handleChangeSearch} onKeyPress={this.handleKeyPress}/>
                    <Link to={{ pathname: "/search", state:{genre: this.state.search} }} variant="outline-none">
                        <i className="fas fa-search"></i>
                    </Link>
                    <Image className="profile-photo"></Image>
                </ButtonToolbar>
            </header>
        );
    }
}
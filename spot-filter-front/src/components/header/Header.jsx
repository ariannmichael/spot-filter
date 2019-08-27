import React, { Component } from 'react';
import './Header.css';
import { Image, ButtonToolbar, Form, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
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
            this.props.history.push({
                pathname: '/search',
                state: {genre: this.state.search}
            });
        }
    }

    moreAlbums = () => {
        axios.get('http://localhost:8080/album/fillAlbumsByGenre')
    }

    render() {
        return(
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <Link to="/home">
                                <div className="heading-name">
                                    <h1>Spot Filter</h1>
                                </div>
                            </Link>
                        </div>
                        <ButtonToolbar className="header-button-toolbar">
                            <div className="col-lg-9">
                                <Link to="/'" className="header-link"  variant="outline-none">
                                    Albums
                                </Link>
                                <Link to="/" className="header-link"  variant="outline-none">
                                    Artists
                                </Link>
                                <Link to="/" className="header-link"  variant="outline-none">
                                    About
                                </Link>                          
                            </div>
                            <div className="col-lg-1">
                                <Form.Control className="search-form" type="text" placeholder="Search" onChange={this.handleChangeSearch} onKeyPress={this.handleKeyPress}/>
                                <Link to={{ pathname: "/search", state:{genre: this.state.search} }} variant="outline-none">
                                    <i className="fas fa-search"></i>
                                </Link>
                            </div>
                            <div className="col-lg-1">
                                <Button className="plus-button" variant="outline-dark" title="More Albums" onClick={this.moreAlbums}>
                                    <i class="fas fa-plus"></i>
                                </Button>
                            </div>
                        </ButtonToolbar>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
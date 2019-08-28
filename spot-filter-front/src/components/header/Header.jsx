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
            .then(res => {
                this.props.history.push({
                    pathname: '/home'
                })
            })
    }

    render() {
        return(
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="heading-name">
                                <h1>Spotfilter</h1>
                            </div>
                        </div>
                        <ButtonToolbar className="header-button-toolbar">
                            <div className="col-lg-7">
                                <Link to="/'" className="header-link"  variant="outline-none">
                                    Albums
                                </Link>
                                <Link to="/" className="header-link"  variant="outline-none">
                                    Artists
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
                                    <i className="fas fa-plus"></i>
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
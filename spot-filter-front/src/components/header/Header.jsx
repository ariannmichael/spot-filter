import React, { Component } from 'react';
import './Header.css';
import { ButtonToolbar, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            displayName: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users/displayname')
            .then(data => this.setState({displayName: data.data.displayName}));
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
        if(this.props.location.pathname === "/albums" || this.props.location.pathname === "/artists") {
            this.props.history.push({
                pathname: this.props.location.pathname
            });
        } 
        
    }

    logout = () => {
        this.setState({displayName: ''})

        axios.get('http://localhost:8080/logout')
        this.props.history.push({
            pathname: '/login'
        });
    }

    render() {
        return(
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="heading-name">
                                <h1>Spotfilter</h1>
                            </div>
                        </div>
                        <ButtonToolbar className="header-button-toolbar">
                            <div className="col-lg-5">
                                <Link to="/albums" className="header-link"  variant="outline-none">
                                    Albums
                                </Link>
                                <Link to="/artists" className="header-link"  variant="outline-none">
                                    Artists
                                </Link>
                            </div>
                            <div className="col-lg-2">
                                <Form.Control className="search-form" type="text" placeholder="Search" onChange={this.handleChangeSearch} onKeyPress={this.handleKeyPress}/>
                                <Link to={{ pathname: "/search", state:{genre: this.state.search} }} variant="outline-none">
                                    <i className="fas fa-search"></i>
                                </Link>
                            </div>
                            <div className="col-lg-2">
                                <Button className="plus-button" variant="outline-dark" title="More Albums and Artists" onClick={this.moreAlbums}>
                                    <i className="fas fa-plus"></i>
                                </Button>
                            </div>
                            <div className="col-lg-1">
                                <DropdownButton className="dropdown-button" variant="dark" title={this.state.displayName}>
                                    <Dropdown.Item className="logout-button" onClick={this.logout}>
                                        Logout
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </ButtonToolbar>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
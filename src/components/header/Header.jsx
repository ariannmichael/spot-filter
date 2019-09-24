import React, { Component } from 'react';
import './Header.css';
import { ButtonToolbar, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { slide as Menu } from 'react-burger-menu';  


var styles = {
    bmBurgerButton: {
        position: 'relative',
        width: '36px',
        height: '30px',
        marginLeft: '10vh'
    },
    bmBurgerBars: {
      background: '#1DB954'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#121212',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            displayName: '',
            id: '',
            showButton: false,
            menuOpen: false
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    async componentDidMount() {
        const userID = this.props.location.pathname.split('/')[2];
        if(userID) {
            this.setState({id: userID});        
            this.setState({showButton: true});

            await axios.get('http://localhost:8080/users/displayname?id=' + userID)
                .then(data => {
                    this.setState({displayName: data.data.displayName});
                });        
        }
    }

    handleChangeSearch = event => {
        this.setState({search: event.target.value});
    }

    handleKeyPress = event => {
        if(event.key === "Enter") {            
            this.props.history.push({
                pathname: '/search',
                state: {genre: this.state.search, id: this.state.id}
            });
        }
    }

    moreAlbums = () => {
        if(this.props.location.pathname === "/albums" || this.props.location.pathname === "/artists") {
            this.props.history.push({
                pathname: this.props.location.pathname,
                state: {id: this.state.id}
            });
        } 
        
        this.closeMenu();
    }

    handleLogout() {
        return(
            <DropdownButton className="dropdown-button" variant="dark" title={this.state.displayName}>
                <Dropdown.Item className="logout-button" onClick={this.logout}>
                    Logout
                </Dropdown.Item>
            </DropdownButton>
        );
    }

    logout = () => {
        this.setState({displayName: ''})
        this.setState({id: ''})

        this.props.history.push({
            pathname: '/login'
        });

        this.closeMenu();
    }

    handleStateChange(state) {
        this.setState({menuOpen: state.isOpen});
    }

    closeMenu() {
        this.setState({menuOpen: false});
    }

    render() {
        const home = this.state.id ? "/home/" + this.state.id : "/";
        return(
            <header className="header">
                <div className="header--items">
                    
                    <div className="heading-name">
                        <Link to={home} className="heading-name--item">
                            <h1>Spotfilter</h1>
                        </Link>
                    </div>
                    <ButtonToolbar className="header-button-toolbar">
                        <div className="header-links">
                            <Link to={{ pathname: "/albums", state: {id: this.state.id} }} className="header-link"  variant="outline-none">
                                Albums
                            </Link>
                            <Link to={{ pathname:"/artists", state: {id: this.state.id} }} className="header-link"  variant="outline-none">
                                Artists
                            </Link>
                        </div>
                        <div className="header-plus-button">
                            <Button className="plus-button" variant="outline-dark" title="More Albums and Artists" onClick={this.moreAlbums}>
                                <i className="fas fa-plus"></i>
                            </Button>
                        </div>
                        <div className="header-search">
                            <Form.Control className="search-form" type="text" placeholder="Search" onChange={this.handleChangeSearch} onKeyPress={this.handleKeyPress}/>
                            <Link to={{ pathname: "/search", state:{genre: this.state.search, id: this.state.id} }} variant="outline-none">
                                <i className="fas fa-search"></i>
                            </Link>
                        </div>
                        <div className="header-logout-button">
                            {this.state.showButton && this.handleLogout()}
                        </div>
                    </ButtonToolbar>
                    <Menu right noOverlay noTransition disableAutoFocus styles={styles} className="menu-burger" isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
                            <Form.Control className="search-form" type="text" placeholder="Search" onChange={this.handleChangeSearch} onKeyPress={this.handleKeyPress}/>
                            <Link to={{ pathname: "/search", state:{genre: this.state.search, id: this.state.id} }} onClick={() => this.closeMenu()} variant="outline-none">
                                <i className="fas fa-search-"></i>
                            </Link>
                            <Link to={{ pathname: "/albums", state: {id: this.state.id} }} className="header-link" onClick={() => this.closeMenu()} variant="outline-none">
                                Albums
                            </Link>
                            <Link to={{ pathname:"/artists", state: {id: this.state.id} }} className="header-link" onClick={() => this.closeMenu()} variant="outline-none">
                                Artists
                            </Link>
                            <Button className="plus-button" variant="outline-dark" title="More Albums and Artists" onClick={this.moreAlbums}>
                                <i className="fas fa-plus"></i>
                            </Button>
                            <Button className="logout-button-menu" onClick={this.logout} variant="secondary">
                                Logout
                            </Button>
                    </Menu>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
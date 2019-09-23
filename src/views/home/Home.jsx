import React, { Component } from 'react';
import './Home.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    async componentDidMount() {
        const id = this.props.location.pathname.split('/')[2];
        this.setState({id});
    }

    render() {
        return(
        <div className="home">
            <div className="spotfilter-text">
                <p className="spotfilter-text-primary">Spotfilter</p>
                <p className="spotfilter-text-secondary">Choose between yours: 
                <Link to={{ pathname: "/albums", state: {id: this.state.id} }} className="home-link"  variant="outline-none">
                    Albums
                </Link>
                or
                <Link to={{ pathname:"/artists", state: {id: this.state.id} }} className="home-link"  variant="outline-none">
                    Artists
                </Link>
                </p>
            </div>
            <br/>
            <div className="home-button">
                <p className="spotfilter-text-secondary">Starts with 25 albums and artists, for more click on: </p>
                <Button className="plus-button-home" variant="outline-dark" title="More Albums">
                    <i className="fas fa-plus"></i>
                </Button>
            </div>
        </div>
    );
    }
}

import React from 'react';
import './Home.css';
import { Button } from 'react-bootstrap';

export default props => (
    <div className="home">
        <div className="spotfilter-text">
            <p className="spotfilter-text-primary">Spotfilter</p>
            <p className="spotfilter-text-secondary">Choose between yours: 
            <span className="home-link"  variant="outline-none">
                Albums
            </span>
            or
            <span className="home-link"  variant="outline-none">
                Artists
            </span>
            </p>
        </div>
        <br/>
        <div className="home-button">
            <p className="spotfilter-text-secondary">Starts with 25 albums and artists, for more click on: </p>
            <Button className="plus-button" variant="outline-dark" title="More Albums">
                <i className="fas fa-plus"></i>
            </Button>
        </div>
    </div>
)

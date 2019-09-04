import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default props => {

    // useEffect(() => {
    //     async function fetchData() {
    //         await axios.get('http://localhost:8080/fillByGenre')
    //     }

    //     fetchData();
    // })

    return (
        <div className="home">
            <div className="spotfilter-text">
                <p className="spotfilter-text-primary">Spotfilter</p>
                <p className="spotfilter-text-secondary">Choose between yours: 
                <Link to="/albums" className="home-link"  variant="outline-none">
                    Albums
                </Link>
                or
                <Link to="/artists" className="home-link"  variant="outline-none">
                    Artists
                </Link>
                </p>
            </div>
            <br/>
            <div className="home-button">
                <p className="spotfilter-text-secondary">Starts with 10 albums and artists, for more click on: </p>
                <Button className="plus-button" variant="outline-dark" title="More Albums">
                    <i className="fas fa-plus"></i>
                </Button>
            </div>
        </div>
    )
}
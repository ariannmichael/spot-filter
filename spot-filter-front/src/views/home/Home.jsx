import React, { Component } from 'react';
import './Home.css';
import Genre from '../../components/genre/Genre';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: ['metalcore', 'adoracao', 'pop', 'rock', 'nu metal']
        }
    }

    render() {
        const genres = this.state.genres.map(genre => {
            return(
                <Genre key={genre} genre={genre} />
            )
        });
        
        return (
            <div className="home--menu">
                {genres}
            </div>
        );
    }
}
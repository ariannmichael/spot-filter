import React, { Component } from 'react';
import './Home.css';
import Genre from '../../components/genre/Genre';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: ['metalcore', 'adoracao']
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
                <h1 className="col-md-6">Spot Filter</h1>
                <br/>
                {genres}
            </div>
        );
    }
}
import React, { Component } from 'react';
import axios from 'axios';

// How to Get Current User's Saved Tracks
// https://developer.spotify.com/console/get-current-user-saved-tracks/

// https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/


// Albums
// https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-albums/

export default class Home extends Component {
    componentDidMount() {
        axios.get();
    }

    render() {
        return (
            <h1 className="col-md-6">Spot Filter</h1>
        );
    }
}
import React, { Component } from 'react';
import axios from 'axios';

import './Home.css';

// How to Get Current User's Saved Tracks
// https://developer.spotify.com/console/get-current-user-saved-tracks/

// https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/


// Albums
// https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-albums/


//OAuth Token
const USER_TOKEN = 'BQDnOQZkyp6OlnU4_VWX4nTt4Y5HG9-FUTkfP8Do_Nuf54W_E9AEefR4ItZ3rQrYAKg_WNlbFYjMo4fTsyzUr3XzkWDTSArhO1FZx0rFKRcEBu3dgw94oJe_7RgzJVrUi9t1dp8c9BgyTlwasfnTHDLGeGh6uP_OCrLbHf_FnR6OYg';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAlbums: []
        }
    }

    componentDidMount() {

        const AuthStr = 'Bearer '.concat(USER_TOKEN)
        axios.get('https://api.spotify.com/v1/me/albums', {
            headers: {
                Authorization: AuthStr
            }
        })
        .then(res => res.data)
        .then(data => {            
            this.setState({ userAlbums: data.items })   
        });
    }

    render() {        
        const albums = this.state.userAlbums.map(album => {
            return(
                <div key={album.name}>{JSON.stringify(album)}</div>
            );
        });
        
        return (
            <div>
                <h1 className="col-md-6">Spot Filter</h1>
                <br/>
                {albums}
            </div>
        );
    }
}
import React, { Component } from 'react';
import axios from 'axios';

import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAlbums: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/album/getAlbumsByGenre')
            // .then(res => console.log(res.data.albumsByGenre));
            .then(res => this.setState({userAlbums: res.data.albumsByGenre}));
    
    }

    render() {        
        // const albums = this.state.userAlbums.map(album => {
        //     return(
        //         <div key={album.name}>{JSON.stringify(album)}</div>
        //     );
        // });
        console.log(this.state.userAlbums);
        
        return (
            <div>
                <h1 className="col-md-6">Spot Filter</h1>
                <br/>
                {/* {albums} */}
            </div>
        );
    }
}
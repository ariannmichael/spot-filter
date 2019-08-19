import React, { Component } from 'react';
import './Genre.css';
import axios from 'axios';
import CardAlbum from '../card/cardAlbum/CardAlbum';


export default class CardGenre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: this.props.genre,
            albumsByGenre: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/album/getAlbumsByGenre')
            // .then(res => console.log(res.data.albumsByGenre));
            .then(res => this.setState({albumsByGenre: res.data.albumsByGenre}));
    }

    render() {
        const albums = this.state.albumsByGenre.map(album => {
            return(
                <CardAlbum key={album} album={album.album}/>
            );
        });

        return(
            <div>
                Card Genre
                <div>
                    {albums}
                </div>
            </div>
        );
    }
}
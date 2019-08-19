import React, { Component } from 'react';
import './CardAlbum.css';


export default class CardAlbum extends Component {
    constructor(props) {
        super(props);

        this.state = {
            albumName: this.props.album.name,
            artistName: this.props.album.artists[0].name,
            albumImage: this.props.album.images[1].url
        }
    }

    render() {
        return (
            <div className="card-album">
                <div className="card-album__img">
                    <img src={this.state.albumImage} alt="Album"/>
                </div>
                <div className="card-album__text">
                    <p className="card-album__text--primary">{this.state.albumName}</p>
                    <p className="card-album__text--secondary">{this.state.artistName}</p>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import './CardArtist.css';


export default class CardAlbum extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artistName: this.props.artist.name,
            artistImage: this.props.artist.images[1].url
        }
    }

    render() {
        console.log(this.props);
        

        return (
            <div className="card-artist">
                <div className="card-artist__img">
                    <img src={this.state.artistImage} alt="Artist"/>
                </div>
                <div className="card-artist__text">
                    <p className="card-artist__text--primary">{this.state.artistName}</p>
                </div>
            </div>
        );
    }
}
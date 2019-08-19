import React, { Component } from 'react';
import './CardAlbum.css';


export default class CardAlbum extends Component {
    constructor(props) {
        super(props);

        this.state = {
            albumName: this.props.album.name,
            artistName: this.props.album.artists[0].name,
            albumImage: ''
        }
    }

    componentDidMount() {
        // console.log(this.props.album.artists[0].name);
        // console.log(this.state.artistName);
        
        
    }

    render() {
        return (
            <div>
                Card Album
                <div>
                    <p>{this.state.albumName}</p>
                    <p>{this.state.artistName}</p>
                </div>
            </div>
        );
    }
}
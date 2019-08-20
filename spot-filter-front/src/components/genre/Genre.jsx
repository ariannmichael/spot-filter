import React, { Component } from 'react';
import './Genre.css';
import axios from 'axios';
import CardAlbum from '../card/cardAlbum/CardAlbum';


export default class CardGenre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: this.props.genre,
            albumsByGenre: [],
            showAlbums: false
        }

        this.toggleAlbums = this.toggleAlbums.bind(this);
    }

    componentDidMount() {
        const genre = this.state.genre;        
        axios.get('http://localhost:8080/album/getAlbumsByGenre?genre=' + genre)
            .then(res => this.setState({albumsByGenre: res.data.albumsByGenre}));
    }

    toggleAlbums() {
        this.setState(state => ({showAlbums: !state.showAlbums}));

    }

    render() {
        const albums = this.state.albumsByGenre.map((album) => {            
            return(
                <CardAlbum key={album} album={album.album}/>
            );
        });

        return(
            <div>
                <section>
                    <div className="genre-line">
                        <button className="btn btn-genre" onClick={this.toggleAlbums}>
                            <i className="fas fa-angle-down"></i>
                            {this.state.genre}
                        </button>
                    </div>
                    <br/>
                    <div className="card-album">
                        { this.state.showAlbums && albums }
                    </div>
                </section>
            </div>
        );
    }
}
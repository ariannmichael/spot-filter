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
        
        axios.get('http://localhost:8080/album/getAlbumsByGenre?id=' + genre._id)
            .then(res => this.setState({albumsByGenre: res.data}));
    }

    toggleAlbums() {
        this.setState(state => ({showAlbums: !state.showAlbums}));

    }

    render() {        
        const albums = this.state.albumsByGenre.map((item) => {            
            return(
                <CardAlbum key={item._id} album={item.album}/>
            );
        });        

        return(
            <div className="genre">
                <section>
                    <div className="genre-line">
                        <button className="btn btn-genre" onClick={this.toggleAlbums}>
                            <i className="fas fa-angle-down"></i>
                            {this.state.genre.genre}
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
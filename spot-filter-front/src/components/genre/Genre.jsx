import React, { Component } from 'react';
import './Genre.css';
import axios from 'axios';
import CardAlbum from '../card/cardAlbum/CardAlbum';
import CardArtist from '../card/cardArtist/CardArtist'


export default class CardGenre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: this.props.genre,
            albumsByGenre: [],
            artistsByGenre: [],
            showItem: false,
            toShow: this.props.toShow,
            id: this.props.id
        }

        this.toggleItems = this.toggleItems.bind(this);
        this.handleAlbums = this.handleAlbums.bind(this);
        this.handleArtists = this.handleArtists.bind(this);
    }

    componentDidMount() {
        const genre = this.state.genre;

        if(this.props.toShow === 'albums') {
            axios.get('http://localhost:8080/album/getAlbumsByGenre?genre_id=' + genre._id + '&id=' + this.state.id)
                .then(res => this.setState({albumsByGenre: res.data}));

        } else if(this.props.toShow === 'artists') {
            axios.get('http://localhost:8080/artist/getArtistsByGenre?id=' + genre._id + '&id=' + this.state.id)
                .then(res => this.setState({artistsByGenre: res.data}));
        }
        
    }

    toggleItems() {
        this.setState(state => ({showItem: !state.showItem}));

    }

    handleAlbums() {        
        const albums = this.state.albumsByGenre.map((item) => {            
            return(
                <CardAlbum key={item._id} album={item.album}/>
            );
        });        

        return(
            <div className="genre">
                <section>
                    <div className="genre-line">
                        <button className="btn btn-genre" onClick={this.toggleItems}>
                            <i className="fas fa-angle-down"></i>
                            {this.state.genre.genre}
                        </button>
                    </div>
                    <br/>
                    <div className="card-album">
                        { this.state.showItem && albums }
                    </div>
                </section>
            </div>
        );
    }

    handleArtists() {        
        const artists = this.state.artistsByGenre.map((item) => {            
            return(
                <CardArtist key={item._id} artist={item}/>
            );
        });        

        return(
            <div className="genre">
                <section>
                    <div className="genre-line">
                        <button className="btn btn-genre" onClick={this.toggleItems}>
                            <i className="fas fa-angle-down"></i>
                            {this.state.genre.genre}
                        </button>
                    </div>
                    <br/>
                    <div className="card-album">
                        { this.state.showItem && artists }
                    </div>
                </section>
            </div>
        );
    }


    render() {
        return(
            <div>
                {this.state.toShow === 'albums' ? this.handleAlbums() : this.handleArtists()}
            </div>
        )
    }
}
import React, { Component } from 'react';
import './Search.css';
import axios from 'axios';
import Genre from '../../components/genre/Genre'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            id: this.props.location.state.id
        }   

        this.handleSearchAlbums = this.handleSearchAlbums.bind(this);
        this.handleSearchArtists = this.handleSearchArtists.bind(this);
    }

    componentDidMount() {        
        axios.get('http://localhost:8080/genre/getGenreID?genre=' + this.props.location.state.genre + '&id=' + this.state.id)
            .then(res => {
                this.setState({genres: res.data.genres}) 
            })

    }

    componentDidUpdate(prevProps) {
        if(this.props.location.state.genre !== prevProps.location.state.genre) {
            this.setState({genres: []});
            axios.get('http://localhost:8080/genre/getGenreID?genre=' + this.props.location.state.genre + '&id=' + this.state.id)
                .then(res => {                
                    this.setState({genres: res.data.genres}) 
                })
        }
    }
    
    handleSearchAlbums() {
        const genres = this.state.genres.sort(function(a, b) {
            var genreA = a.genre.toUpperCase(); // ignore upper and lowercase
            var genreB = b.genre.toUpperCase(); // ignore upper and lowercase
            if (genreA < genreB) {
              return -1;
            }
            if (genreA > genreB) {
              return 1;
            }
          
            // genres must be equal
            return 0;
          }).map(genre => {
            return(
                <Genre key={genre._id} genre={genre} id={this.state.id} toShow={'albums'}/>
            )
        });
        
        return(
            <div className="search-menu">
                {genres}
            </div>
        );
    }

    handleSearchArtists() {
        const genres = this.state.genres.sort(function(a, b) {
            var genreA = a.genre.toUpperCase(); // ignore upper and lowercase
            var genreB = b.genre.toUpperCase(); // ignore upper and lowercase
            if (genreA < genreB) {
              return -1;
            }
            if (genreA > genreB) {
              return 1;
            }
          
            // genres must be equal
            return 0;
          }).map(genre => {
            return(
                <Genre key={genre._id} genre={genre} id={this.state.id} toShow={'artists'}/>
            )
        });
        
        return(
            <div className="search-menu">
                {genres}
            </div>
        );
    }

    render() {
        return(
            <div>
                <div>
                    <h1 className="album-text">Albums:</h1>
                    {this.handleSearchAlbums()}
                </div>
                <div>
                    <h1 className="album-text">Artists:</h1>
                    {this.handleSearchArtists()}
                </div>
                
            </div>
        );
    }
}
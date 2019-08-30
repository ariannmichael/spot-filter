import React, { Component } from 'react';
import './Home.css';
import Genre from '../../components/genre/Genre';
import axios from 'axios';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres:[]
        }
    }

    componentDidMount() {
        //axios get fillAlbumsByGenre
        // axios.get('http://localhost:8080/album/fillAlbumsByGenre')

        //axios get genres
        axios.get('http://localhost:8080/genre/getGenres')
            .then(result => {                
                this.setState({genres: result.data.genres});
            });
        
    }

    render() {
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
                <Genre key={genre._id} genre={genre} />
            )
        });
        
        return (
            <div className="home-menu">
                {genres}
            </div>
        );
    }
}
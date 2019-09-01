import React, { Component } from 'react';
import './Search.css';
import axios from 'axios';
import Genre from '../../components/genre/Genre'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: []
        }   
    }

    componentDidMount() {        
        axios.get('http://localhost:8080/genre/getGenreID?genre=' + this.props.location.state.genre)
            .then(res => {     
                this.setState({genres: res.data}) 
            })

    }

    componentDidUpdate(prevProps) {
        if(this.props.location.state.genre !== prevProps.location.state.genre) {
            this.setState({genres: []});
            axios.get('http://localhost:8080/genre/getGenreID?genre=' + this.props.location.state.genre)
                .then(res => {                
                    this.setState({genres: res.data}) 
                })
        }
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
        
        return(
            <div className="search-menu">
                {genres}
            </div>
        );
    }
}
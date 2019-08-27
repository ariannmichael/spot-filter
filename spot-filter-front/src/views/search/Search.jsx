import React, { Component } from 'react';
import './Search.css';
import axios from 'axios';
import Genre from '../../components/genre/Genre'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: []
        }   
    }

    componentDidMount() {        
        axios.get('http://localhost:8080/genre/getGenreID?genre=' + this.props.location.state.genre)
            .then(res => {                
                this.setState({genre: res.data}) 
            })

    }

    componentDidUpdate(prevProps) {
        if(this.props.location.state.genre !== prevProps.location.state.genre) {
            this.setState({genre: []});
            axios.get('http://localhost:8080/genre/getGenreID?genre=' + this.props.location.state.genre)
                .then(res => {                
                    this.setState({genre: res.data}) 
                })
        }
    }
    
    render() {
        const genres = this.state.genre.map(genre => {
            return(
                <Genre key={genre._id} genre={genre}/>
            );
        });
        
        return(
            <div className="search-menu">
                {genres}
            </div>
        );
    }
}
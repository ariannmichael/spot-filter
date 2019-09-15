import React, { Component } from 'react';
import { css } from '@emotion/core';
import './Artists.css';
import Genre from '../../components/genre/Genre';
import axios from 'axios';
import SyncLoader from 'react-spinners/SyncLoader';


const override = css`
    display: block;
    margin: 35vh auto;
    text-align: center;
    border-color: #1DB954;
`;

export default class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres:[],
            loading: true,
            id: this.props.location.state.id
        }

        this.handleLoading = this.handleLoading.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
    }

    async componentDidMount() {        
        axios.get('http://localhost:8080/fillByGenre').then(res => {
            //axios get genres
            axios.get('http://localhost:8080/genre/getGenres?id=' + this.state.id)
                .then(result => {                
                    this.setState({genres: result.data.genres});
                    this.setState({loading: false});
                });
        })
    }

    async componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            this.setState({loading: true});

            await axios.get('http://localhost:8080/genre/getGenres?id=' + this.state.id)
                .then(result => {                
                    this.setState({genres: result.data.genres});
                    this.setState({loading: false});
                });
        }
    }

    handleLoading() {
        return(
            <div className='sweet-loading'>
                <SyncLoader
                    css={override}
                    sizeUnit={"rem"}
                    size={2}
                    color={'#1DB954'}
                    loading={this.state.loading}
                />
            </div>
        );
    }

    handleGenres(){
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
        
        return (
            <div className="home-menu">
                {genres}
            </div>
        );
    }

    render() {
        return(
            <div>
                <h1 className="album-text">Artists:</h1>
                {this.state.loading ? this.handleLoading() : this.handleGenres()}
            </div>
        )
    }
}
import React, {useState} from 'react';


const IMG_API = "https://image.tmdb.org/t/p/w500";
const setVoteClass = (vote) => {
    if(vote >= 8){
        return "green";
    } else if(vote >= 6) {
        return "orange";
    } else {
        return "red";
    }
}

const Movie = (props) => {

    const {title, poster_path, vote_average, overview, favcomponent, handleFavClick} = props;
    const FavouriteComponent = favcomponent;

    
    return (
        <div className="movie-container">
        {props.movies.length > 0 && props.movies.map((movie, index) => (
        <div className="movie" key={movie.id}>

        <img src={movie.poster_path ? ( IMG_API + movie.poster_path) : 'https://images.unsplash.com/photo-1597575732103-9f6d068cfa9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fG1vdmllfGVufDB8MXwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' } alt={title}/>
        <div className="movie-info">
        <h3>{movie.title}</h3>



        <span className={`tag ${setVoteClass(movie.vote_average)}`}>
        {movie.vote_average}</span>
        
        </div>
        <div className="movie-over">
        <h2>Overview:</h2>
        <p>{movie.overview}</p></div>
        <div onClick={()=>props.handleFavClick(movie)}>
        <FavouriteComponent/></div>
        </div>
        ))}
        </div>
        
    )
}

export default Movie;
import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";



const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ba23ad4269ffd237d77cf803dbe153bb&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=ba23ad4269ffd237d77cf803dbe153bb&query=";


function App() {

  const [ movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favourites, setFavourites] = useState([]);

    useEffect(()=>{
      getMovies(FEATURED_API);
    },[]);

    useEffect(()=>{
      
      const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
      if (movieFavourites != null) {
      setFavourites(movieFavourites);
      }
    
    },[]);

    const saveToLocalStorage = (items) => {
      localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    }

    const getMovies = (API) => {
      fetch(API)
        .then((res)=> res.json())
        .then((data) => {
          console.log(data);
          setMovies(data.results);
        });
    }

    const handleOnSubmit = (e)=>{
      e.preventDefault();
      if(searchTerm){
        getMovies(SEARCH_API + searchTerm);
        setSearchTerm('');
      }


    }

    const handleOnChange = (e) => {
      setSearchTerm(e.target.value);
    }

    const addFavMovie = (movie) => {
      const newFavList = [...favourites, movie]
      setFavourites(newFavList);
      saveToLocalStorage(newFavList);

    }

    const removeFavMovie = (movie) => {
      const newFavList = favourites.filter(
        (favourite) => (favourite.id !== movie.id)
      );
      setFavourites(newFavList);
      saveToLocalStorage(newFavList);
    }

  return (
    <div>
    
    <header>
    <h3>MOVIE - HOUSE</h3>
    
    <form onSubmit={handleOnSubmit}>
    <input className="search" 
    type="search" 
    placeholder="Search..."
    value={searchTerm}
    onChange={handleOnChange}
    />
    </form>
    
    </header>
    <div >
  
        <Movie
        key={movies.id}
        movies = {movies}
        favcomponent = {AddFavourites}
        handleFavClick = {addFavMovie}
        />
      
    </div>

    {favourites.length > 0 &&
      <h3 style={{backgroundColor:"#33242a", padding:"1rem", textAlign:"center"}}>YOUR FAVOURITES</h3>
    }
    <div>

    <Movie 
    key={movies.id}
    movies = {favourites}
    favcomponent = {RemoveFavourites}
    handleFavClick = {removeFavMovie}
    />
      
    </div>




    </div>
  );
}

export default App;

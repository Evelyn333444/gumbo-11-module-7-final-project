import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import Sort from './components/Sort';


const API_URL = 'https://omdbapi.com/?apikey=fe2f6c44';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('');
    const [viewModal, setViewModal] = useState(false)
    const [movie, setMovie] = useState({})

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        setMovies(data.Search.length > 0 ? data.Search : [])
    }

    return (
        <div className="app">
            <h1>Movie Center</h1>

            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20230626112934/search.png"
                    alt="search icon"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {sortedMovies?.length > 0 ? (
                <div className="container">
                    {sortedMovies.map((movie) => (
                        <MovieCard movie={movie} key={movie.imdbID} onClick={() => {
                            setMovie(movie)
                            setViewModal(true)
                        }} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No Movies found</h2>
                </div>
            )}
            {viewModal && (<MovieModal movie={movie} onClose={()=> setViewModal(false)} />)}
        </div>
//Lines 55-70 are showing how to put the modal in action on the website.

    );
}

export default App;



  
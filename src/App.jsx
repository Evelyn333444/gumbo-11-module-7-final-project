import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

const API_URL = 'https://omdbapi.com/?apikey=fe2f6c44';
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('SpiderMan');
    }, []);
    return (
        <div className="app">
            <h1> Movie Center</h1>

            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                />
                <img
                    src=
"https://media.geeksforgeeks.org/wp-content/uploads/20230626112934/search.png"
                    alt="search icon"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (<div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>) : (
                        <div className="empty">
                            <h2>No Movies found</h2>
                        </div>
                    )
            }

            </div>
    );
}

// Example using a placeholder API key and fetching movie details
const apiKey = 'fe2f6c44'; 
const movieTitle = 'Inception';
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`;

async function getMovieData() {
  try {
    // 1. Fetch data from primary API (e.g., TMDB)
    const response = await fetch(searchUrl);
    const data = await response.json();
    console.log(data); // Movie details (title, overview, poster, etc.)
    
    // 2. Embed second API (e.g., OMDB for detailed info)
    const movieID = data.results[0].id;
    const detailsUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=YOUR_SECOND_API_KEY`;
    const detailsResponse = await fetch(detailsUrl);
    const movieDetails = await detailsResponse.json();
    console.log(movieDetails); // More detailed information
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const API_KEY = 'd3102f89'; // Your OMDb API key
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');
const filter = document.querySelector('#filter')

let currentMovies= []

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value;
    if (searchTerm) {
        searchMovies(searchTerm);
    }
});

async function searchMovies(query) {
    // Note: OMDb API requires a single movie search parameter ('t') or a search term ('s')
    // When using 's' for search, the response structure is different (results are in a "Search" array)
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Search) {
        currentMovies = data.Search;
        filter.value = '';
        displayMovies(currentMovies);
    } else {
        movieContainer.innerHTML = '<p>No movies found.</p>';
        currentMovies = [];
    }
}

function displayMovies(movies) {
    movieContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://placeholder.com'}" alt="${movie.Title} Poster">
            <div class="movie-info">
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
            </div>
        `;

        movieContainer.appendChild(movieCard);
    });
}
filter.addEventListener('change', (e) => {
    renderMovies(e.target.value)
})

function renderMovies(sortType) {
    let sortedMovies = [...currentMovies]; //copy so original is preserved

    if (sortType === 'NEW_TO_OLD') {
        sortedMovies.sort((a,b) => Number(b.Year)- Number(a.year));
    }
    else if (sortType === 'OLD_TO_NEW') {
        sortedMovies.sort((a,b) => Number(a.Year) - Number(b.Year));
    }

    displayMovies(sortedMovies);
}

export default App;

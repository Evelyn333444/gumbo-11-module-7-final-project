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
            <h1>GeeksforGeeks's Movie Center</h1>

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

getMovieData();

const items = [
  { name: "Event A", date: "2023-05-10" },
  { name: "Event B", date: "2021-12-01" },
  { name: "Event C", date: "2024-01-15" }
];

const sorter = document.getElementById('dateSorter');
const list = document.getElementById('itemList');

function renderList(data) {
  list.innerHTML = data.map(item => `<li>${item.name} - ${item.date}</li>`).join('');
}

sorter.addEventListener('change', (e) => {
  const sorted = [...items].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return e.target.value === 'asc' ? dateA - dateB : dateB - dateA;
  });
  renderList(sorted);
});

// Initial render
renderList(items);

export default App;

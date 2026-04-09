import React from 'react';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie">
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/400"} alt={movie.Title} />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </div>
            
            function MovieCard({ movie, onClick }) {
                return (
                    <div className="movie-card" onClick={() => onClick(movie)}>
                        <img src={movie.poster} alt={movie.title} />
                             <h3>{movie.title}</h3>
                             <p>{movie.releaseDate}</p>
                             <p>{movie.genre}</p>
                             <p>{movie.summary}</p>
                    </div>
    );


        </div>
    )
}

export default MovieCard;

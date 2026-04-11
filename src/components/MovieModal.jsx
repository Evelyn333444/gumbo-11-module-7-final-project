const MovieModal = ({ movie, onClose }) => {
    if (!movie) return null; // don't show if no movie is selected

    return (
        <div className="modal-overlay" onClick={onClose}> {/* click outside to close */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* prevent closing when clicking inside */}
                <span className="close-button" onClick={onClose}>&times;</span>
                <img src={movie.Poster} alt={movie.Title} />
                <h2>{movie.Title}</h2>
                <p><strong>Year:</strong> {movie.Year}</p>
                <p><strong>Type:</strong> {movie.Type}</p>
            </div>
        </div>
    );
}

export default MovieModal
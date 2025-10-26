import React from 'react';
import './MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <h3>{movie.title}</h3>
      <p className="genre">{movie.genre}</p>
      <p className="rating" text="Ratings: "> {movie.rating}/10</p>
    </div>
  );
}

export default MovieCard;

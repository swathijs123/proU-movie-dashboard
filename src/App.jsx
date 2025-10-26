import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import FilterBar from './components/FilterBar';
import moviesData from './data/movies.json'; // Ensure this path is correct
import './App.css';

function App() {
  const [movies, setMovies] = useState(moviesData);
  const [genre, setGenre] = useState('');

  // --- PAGINATION STATE AND LOGIC ---
  const [page, setPage] = useState(1);
  const moviesPerPage = 4; // Show 4 movies per page

  // Calculate the subset of movies to display
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const indexOfLastMovie = page * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  
  // This holds ONLY the movies for the current page
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setPage(pageNumber);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // ----------------------------------------

  const genres = [...new Set(moviesData.map((m) => m.genre))];

  useEffect(() => {
    // Filtering logic
    let filteredMovies = moviesData;
    if (genre !== '') {
        filteredMovies = moviesData.filter((m) => m.genre === genre);
    }
    
    setMovies(filteredMovies);
    setPage(1); // Reset page to 1 whenever filtering changes
  }, [genre]);

  return (
    <div>
      <Navbar />
      {/* Ensure FilterBar is imported correctly from FilterBar.jsx */}
      <FilterBar genres={genres} selectedGenre={genre} onFilterChange={setGenre} /> 
      
      <div className="movie-container">
        {/* Render currentMovies ONLY */}
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {/* --- PAGINATION BUTTONS --- */}
      {totalPages > 1 && (
        <div className="pagination">
          {pageNumbers.map(number => (
            <button 
              key={number} 
              onClick={() => paginate(number)}
              className={page === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
        </div>
      )}
      {/* -------------------------- */}
    </div>
  );
}

export default App;
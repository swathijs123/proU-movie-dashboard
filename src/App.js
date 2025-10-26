import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext'; // <--- NEW: Import useAuth hook
import Login from './components/Login'; // <--- NEW: Import Login component
import './App.css';
import moviesData from './data/movies.json';

// Components (Keeping them here as they were in your original App.js)

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Movie Dashboard</h1>
    </nav>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.genre} | {movie.year}</p>
      <p>⭐ {movie.rating}</p>
    </div>
  );
}

function FilterBar({ 
  genres, 
  selectedGenre, 
  onGenreChange, 
  minRating, 
  onRatingChange, 
  sortBy, 
  onSortChange,
  searchTerm,
  onSearchChange
}) {
  return (
    <div className="filter-bar">
      {/* Search Bar */}
      <div className="filter-group search-group"> 
        <input 
          type="text"
          placeholder="Search by Title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Genre Filter Dropdown */}
      <div className="filter-group">
        <label htmlFor="genre-select">Genre:</label>
        <select 
          id="genre-select"
          value={selectedGenre} 
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Minimum Rating Filter */}
      <div className="filter-group">
        <label htmlFor="rating-select">Min Rating:</label>
        <select 
          id="rating-select"
          value={minRating} 
          onChange={(e) => onRatingChange(parseFloat(e.target.value))}
        >
          <option value="0">Any</option>
          <option value="9.0">9.0+</option>
          <option value="8.0">8.0+</option>
          <option value="7.0">7.0+</option>
          <option value="6.0">6.0+</option>
        </select>
      </div>

      {/* Sort By Dropdown */}
      <div className="filter-group">
        <label htmlFor="sort-select">Sort By:</label>
        <select 
          id="sort-select"
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="year">Year (Newest)</option>
          <option value="rating">Rating (Highest)</option>
        </select>
      </div>
    </div>
  );
}

// Mock Data (Original data from your App.js)



// --- Main App Component ---

function App() {
  const { isLoggedIn, logout } = useAuth(); // <--- NEW: Get auth state

  // State for Movie Data and Filters
  const [movies, setMovies] = useState(moviesData);
  const [genre, setGenre] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('year');
  const [searchTerm, setSearchTerm] = useState(''); // <--- NEW: Search term

  const genres = [...new Set(moviesData.map(m => m.genre))];

  useEffect(() => {
    let filteredMovies = moviesData;
    
    // 1. Filter by Search Term (Title)
    if (searchTerm !== '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredMovies = filteredMovies.filter((m) => 
            m.title.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }

    // 2. Filter by Genre
    if (genre !== '') {
      filteredMovies = filteredMovies.filter(m => m.genre === genre);
    }

    // 3. Filter by Minimum Rating
    filteredMovies = filteredMovies.filter(m => m.rating >= minRating);

    // 4. Sort the movies
    const sortedMovies = [...filteredMovies].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating; 
      }
      return b.year - a.year; 
    });

    setMovies(sortedMovies);
  }, [genre, minRating, sortBy, searchTerm]);


  // Conditional Rendering: Show Login if not authenticated
  if (!isLoggedIn) {
    return <Login />;
  }

  // Render Dashboard if logged in
  return (
    <div>
      <Navbar />
      <button onClick={logout} className="logout-btn">Log Out</button> 
      
      <FilterBar 
        genres={genres} 
        selectedGenre={genre} 
        onGenreChange={setGenre} 
        minRating={minRating} 
        onRatingChange={setMinRating} 
        sortBy={sortBy} 
        onSortChange={setSortBy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="movie-container">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
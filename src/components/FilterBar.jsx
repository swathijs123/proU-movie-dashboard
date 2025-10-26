import React from 'react';
import './FilterBar.css';

function FilterBar({ 
  genres, 
  selectedGenre, 
  onGenreChange, 
  minRating, 
  onRatingChange, 
  sortBy, 
  onSortChange,
  searchTerm, // New prop
  onSearchChange // New prop
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

export default FilterBar;
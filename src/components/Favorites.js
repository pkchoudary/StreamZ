import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = ({ favorites }) => {
  return (
    <div>
      <h2>My Favorite Movies</h2>
      <div className="movie-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
            </Link>
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;

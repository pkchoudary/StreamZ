import React from 'react';

const Watchlist = () => {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  return (
    <div>
      <h1>Watchlist</h1>
      <ul>
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))
        ) : (
          <p>No movies in your watchlist yet</p>
        )}
      </ul>
    </div>
  );
};

export default Watchlist;

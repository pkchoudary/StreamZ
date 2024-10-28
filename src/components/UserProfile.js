// src/components/UserProfile.js
import React, { useState } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    watchlist: [],
  });
  const [movieOrSeries, setMovieOrSeries] = useState('');

  const addToWatchlist = () => {
    if (movieOrSeries) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        watchlist: [...prevProfile.watchlist, movieOrSeries],
      }));
      setMovieOrSeries('');
    }
  };

  return (
    <div>
      <h1>Welcome, {profile.name || 'User'}</h1>
      <input
        type="text"
        placeholder="Enter profile name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <h2>Favorites/Watchlist</h2>
      <ul>
        {profile.watchlist.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add to watchlist"
        value={movieOrSeries}
        onChange={(e) => setMovieOrSeries(e.target.value)}
      />
      <button onClick={addToWatchlist}>Add to Watchlist</button>
    </div>
  );
};

export default UserProfile;

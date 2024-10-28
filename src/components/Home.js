import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchTrendingSeries, fetchTopRatedMovies, fetchTopRatedSeries, searchMoviesAndSeries } from '../tmdb';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState('IN');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [searchResults, setSearchResults] = useState({ movies: [], series: [] });

  useEffect(() => {
    const loadTrendingMovies = async () => {
      const trending = await fetchTrendingMovies();
      setTrendingMovies(trending);
    };

    const loadTrendingSeries = async () => {
      const trending = await fetchTrendingSeries();
      setTrendingSeries(trending);
    };

    const loadTopRatedMovies = async () => {
      const topRated = await fetchTopRatedMovies();
      setTopRatedMovies(topRated);
    };

    const loadTopRatedSeries = async () => {
      const topRated = await fetchTopRatedSeries();
      setTopRatedSeries(topRated);
    };

    loadTrendingMovies();
    loadTrendingSeries();
    loadTopRatedMovies();
    loadTopRatedSeries();
  }, [country]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      const results = await searchMoviesAndSeries(e.target.value);
      setSearchResults(results);
    } else {
      setSearchResults({ movies: [], series: [] });
    }
  };

  return (
    <div>
      <h1>Content Available in {country}</h1>
      <select onChange={(e) => setCountry(e.target.value)}>
        <option value="IN">India</option>
        <option value="US">USA</option>
        <option value="UK">UK</option>
      </select>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search movies or series"
      />

      {/* Search Results */}
      {searchTerm && (
        <>
          <h2>Search Results</h2>
          <div className="movie-list">
            {searchResults.movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div className="movie-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            ))}
            {searchResults.series.map((series) => (
              <Link key={series.id} to={`/series/${series.id}`}>
                <div className="movie-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${series.poster_path}`}
                    alt={series.name}
                  />
                  <h3>{series.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Trending Movies */}
      <h2>Trending Movies</h2>
      <div className="movie-list">
        {trendingMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Trending Series */}
      <h2>Trending Series</h2>
      <div className="movie-list">
        {trendingSeries.map((series) => (
          <Link key={series.id} to={`/series/${series.id}`}>
            <div className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${series.poster_path}`}
                alt={series.name}
              />
              <h3>{series.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Top Rated Movies */}
      <h2>Top Rated Movies</h2>
      <div className="movie-list">
        {topRatedMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Top Rated Series */}
      <h2>Top Rated Series</h2>
      <div className="movie-list">
        {topRatedSeries.map((series) => (
          <Link key={series.id} to={`/series/${series.id}`}>
            <div className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${series.poster_path}`}
                alt={series.name}
              />
              <h3>{series.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

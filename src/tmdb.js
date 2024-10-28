import axios from 'axios';

const API_KEY = '24d316cc3e065df11d180870a462859b';  // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch Movies by Country
export const fetchMovies = async (country) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        region: country,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch Series by Country
export const fetchSeries = async (country) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        region: country,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching series:", error);
    return [];
  }
};

// Fetch Trending Movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

// Fetch Trending Series
export const fetchTrendingSeries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/tv/week`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending series:", error);
    return [];
  }
};

// Fetch Top Rated Movies
export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return [];
  }
};

// Fetch Top Rated Series
export const fetchTopRatedSeries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated series:", error);
    return [];
  }
};

// Fetch Streaming Availability by Country for Movies or Series
export const fetchStreamingAvailability = async (id, country, type = 'movie') => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/${id}/watch/providers`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results[country]?.flatrate || [];
  } catch (error) {
    console.error("Error fetching streaming availability:", error);
    return [];
  }
};

// Search Movies and Series
export const searchMoviesAndSeries = async (query) => {
  try {
    // Request both movies and series search at the same time using Promise.all
    const [moviesResponse, seriesResponse] = await Promise.all([
      axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
        },
      }),
      axios.get(`${BASE_URL}/search/tv`, {
        params: {
          api_key: API_KEY,
          query,
        },
      }),
    ]);

    // Return the results from both API calls
    return {
      movies: moviesResponse.data.results || [],
      series: seriesResponse.data.results || [],
    };
  } catch (error) {
    console.error("Error searching movies and series:", error);
    return {
      movies: [],
      series: [],
    };
  }
};

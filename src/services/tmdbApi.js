import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

export const tmdbApi = {
  getTrendingMovies: async () => {
    const response = await apiClient.get('/trending/movie/day');
    return response.data.results;
  },

  searchMovies: async (query, page = 1) => {
    const response = await apiClient.get('/search/movie', {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page,
      },
    });
    return response.data.results;
  },

  getMovieDetails: async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  },

  getMovieCast: async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  },

  getMovieReviews: async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  },
};

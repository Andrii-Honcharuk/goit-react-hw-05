import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization:
     `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODFjM2NiMzA4ZWU5MjY0NjhmOTZkMjMwZmM3ZjgzNCIsInN1YiI6IjY1ZWM4ZjcyOWQ4OTM5MDE4NTJiMWUzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wtXPpYJcIJC42stz4No17fF5nmg72JNYpAn3RPYfiFA`,
  },
};


const url = 'trending/movie/day?language=en-US';

export const getMovies = async () => {
  const response = await axios.get(url, options);
  console.log('getMovies', response.data);
  return response.data;
};

//https://api.themoviedb.org/3/movie/{movie_id}

export const getMovieById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, options);
  console.log('getMovieById', response.data);
  return response.data;
};

//Credits
// https://api.themoviedb.org/3/movie/{movie_id}/credits

export const getMovieCreditsById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  
  console.log('getMovieCredits', response.data.cast,);
  const actingCast = response.data.cast.filter(actor => actor.known_for_department === 'Acting');
  console.log('Актори', actingCast);
  return actingCast;
};

// Reviews
// https://api.themoviedb.org/3/movie/{movie_id}/reviews

export const getMovieReviewsById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  console.log('getMovieReviews', response);
  return response.data;
};

//Search
//'https://api.themoviedb.org/3/search/movie?query=SOMETHINK&include_adult=false&language=en-US&page=2'

export const getMovieByName = async (query, page=1) => {
  const response = await axios.get(`/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`, options);
  console.log('Query - ', query,'SEARCH', response.data);
  return response.data;
};


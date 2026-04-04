import axios from "axios";

const API_KEY = "62b1eaef5c77431465153161f2f772c1"; // paste your TMDb key

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const getPopularMovies = () =>
  api.get(`/movie/popular?api_key=${API_KEY}`);

export default api;
export const getMovieDetails = (id) =>
  api.get(`/movie/${id}?api_key=${API_KEY}`);
export const getGenres = () => {
  return axios.get("https://api.themoviedb.org/3/genre/movie/list", {
    params: {
      api_key: "62b1eaef5c77431465153161f2f772c1",
    },
  });
};

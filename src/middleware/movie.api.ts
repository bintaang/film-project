import axios from "axios";

// Create axios instance with base URL from environment variables
// If you want to change the API base URL, update VITE_REACT_API_URL in your .env file
const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
});

// Request interceptor to automatically add authorization header to all requests
// If you want to change the token, update VITE_REACT_API_TOKEN in your .env file
instance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_REACT_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API for fetching popular movies
// If you want to change the page number or language, modify the URL parameters here
const movieApiPopuler = {
  getMovie: () =>
    instance({
      method: "GET",
      url: "3/movie/popular?api_key=5f8c7d0e1c2a4b6f9d8e1c2a4b6f9d8e&language=en-US&page=1",
    }),
};

// API for fetching movies by specific language and region
// If you want to change sorting criteria or filters, modify the URL parameters here
const movieApiRegion = {
  getMovie: (lang: string, region: string) =>
    instance({
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang}&region=${region}&sort_by=popularity.desc&with_origin_country=${region}&page=1`,
    }),
};

// API for fetching TV shows from Indonesia (ID region)
// If you want to change the country, page number, or other filters, modify the URL parameters here
const tvApiRegion = {
  getMovie: () =>
    instance({
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=5&sort_by=popularity.desc&with_origin_country=ID`,
    }),
};

// API for fetching detailed information about a specific movie or TV show
// If you want to change the language, modify the language parameter here
const mediaApi = {
  getDetail: (mediaType: "movie" | "tv", id: number) =>
    instance({
      method: "GET",
      url: `${mediaType}/${id}?language=en-US`, // This will correctly form /3/movie/{id} or /3/tv/{id}
    }),
};
export { movieApiPopuler, movieApiRegion, tvApiRegion, mediaApi };

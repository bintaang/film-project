import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_REACT_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const movieApiPopuler = {
  getMovie: () =>
    instance({
      method: "GET",
      url: "3/movie/popular?api_key=5f8c7d0e1c2a4b6f9d8e1c2a4b6f9d8e&language=en-US&page=1",
    }),
};

const movieApiRegion = {
  getMovie: (lang: string, region: string) =>
    instance({
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang}&region=${region}&sort_by=popularity.desc&with_origin_country=${region}&page=1`,
    }),
};

const tvApiRegion = {
  getMovie: () =>
    instance({
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=5&sort_by=popularity.desc&with_origin_country=ID`,
    }),
};

const mediaApi = {
  getDetail: (mediaType: "movie" | "tv", id: number) =>
    instance({
      method: "GET",
      url: `${mediaType}/${id}?language=en-US`, // This will correctly form /3/movie/{id} or /3/tv/{id}
    }),
};
export { movieApiPopuler, movieApiRegion, tvApiRegion, mediaApi };

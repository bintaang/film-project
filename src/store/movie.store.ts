/**
 * Movie Store Management using Zustand
 *
 * This file creates three different stores for managing movie and TV series data:
 * 1. Popular movies store
 * 2. Region-specific movies store
 * 3. Region-specific TV series store
 *
 * If you want to change API endpoints, modify the imports from "../middleware/movie.api.ts"
 * If you want to add new stores, follow the same pattern: define interface → create store → export
 */

import { create } from "zustand";
import {
  movieApiPopuler,
  movieApiRegion,
  tvApiRegion,
} from "../middleware/movie.api.ts";

/**
 * Interface for Popular Movies Store
 * If you want to add new properties to popular movies, modify this interface
 */
interface MovieState {
  movies: [];
  setMovies: () => void;
  lang?: string;
  region?: string;
  id: string;
}

/**
 * Store for Popular Movies
 * This fetches and stores popular movies without region/language filtering
 * If you want to change the API call, modify the movieApiPopuler.getMovie() call
 */
const storePopular = create<MovieState>((set) => ({
  movies: [],
  id: "",
  setMovies: async () => {
    try {
      const response = await movieApiPopuler.getMovie();
      set({ movies: response.data.results });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

/**
 * Interface for Region-Specific Movies Store
 * If you want to add new properties for regional movies, modify this interface
 */
interface MovieRegionState {
  movies: [];
  lang: string;
  region: string;
  setMovies: (lang: string, region: string) => Promise<void>;
  id: string;
}

/**
 * Store for Region-Specific Movies
 * This fetches movies based on language and region parameters
 * If you want to change default language/region, modify the initial values below
 * If you want to change the API call, modify the movieApiRegion.getMovie() call
 */
const storeRegion = create<MovieRegionState>((set, get) => ({
  movies: [],
  lang: "id-ID", // Default language - change this if you want different default
  region: "ID", // Default region - change this if you want different default
  id: "",
  setMovies: async (newLang: string, newRegion: string) => {
    try {
      if (newLang !== undefined && newRegion !== undefined) {
        set({ lang: newLang, region: newRegion });
      }
      const currentLang = get().lang;
      const currentRegion = get().region;

      const response = await movieApiRegion.getMovie(
        currentLang,
        currentRegion,
      );
      set({ movies: response.data.results });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

/**
 * Interface for TV Series Store
 * If you want to add new properties for TV series, modify this interface
 */
interface seriesState {
  movies: [];
  setMovies: () => Promise<void>;
  id: string;
}

/**
 * Store for TV Series by Region
 * This fetches and stores TV series data
 * If you want to change the API call, modify the tvApiRegion.getMovie() call
 */
const storeTvRegion = create<seriesState>((set) => ({
  movies: [],
  id: "",
  setMovies: async () => {
    try {
      const response = await tvApiRegion.getMovie();
      set({ movies: response.data.results });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

/**
 * Export all stores
 * If you create new stores, don't forget to export them here
 */
export { storePopular, storeRegion, storeTvRegion };

import { create } from "zustand";
import {
  movieApiPopuler,
  movieApiRegion,
  tvApiRegion,
} from "../middleware/movie.api.ts";

interface MovieState {
  movies: [];
  setMovies: () => void;
  lang?: string;
  region?: string;
  id: string;
}

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

//Define State for Movie per-Region
interface MovieRegionState {
  movies: [];
  lang: string;
  region: string;
  setMovies: (lang: string, region: string) => Promise<void>;
  id: string;
}

const storeRegion = create<MovieRegionState>((set, get) => ({
  movies: [],
  lang: "id-ID",
  region: "ID",
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

interface seriesState {
  movies: [];
  setMovies: () => Promise<void>;
  id: string;
}

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

export { storePopular, storeRegion, storeTvRegion };

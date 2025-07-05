// src/components/Moviecard.tsx (MODIFIED)

import { useEffect } from "react";
import { storePopular, storeRegion, storeTvRegion } from "../store/movie.store";
import { Link } from "react-router-dom";
import { listed } from "../constant/listed"; // Import your listed routes

// Refined interface to accommodate both movie and TV show properties
interface MediaResult {
  backdrop_path: string | null;
  id: number;
  original_title?: string; // For movies
  name?: string; // For TV shows
  overview: string;
  poster_path: string | null;
}

// --- Moviecard (for popular movies) ---
const Moviecard = () => {
  const { setMovies, movies } = storePopular();

  useEffect(() => {
    setMovies();
  }, [setMovies]); // Added dependency array for useEffect

  return (
    <div className="flex flex-row flex-nowrap gap-5 w-max overflow-x-scroll p-5 scroll-hidden">
      {/* Use MediaResult for type, and item.id for key */}
      {movies?.map((item: MediaResult) => {
        if (!item.overview) return null;

        return (
          // Link to the generic detail page, explicitly setting mediaType to 'movie'
          <Link
            to={listed.detail
              .replace(":mediaType", "movie")
              .replace(":id", item.id.toString())}
            key={item.id} // Use item.id as key
            className="block" // Make the whole card clickable
          >
            <div className="group w-60 shadow-xl transition-all duration-900 ease-in-out hover:scale-105 hover:h-auto overflow-hidden relative hover:shadow-sky-800 rounded-xl">
              <div className="card w-full">
                <figure className="w-full">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "https://via.placeholder.com/240x360?text=No+Image"
                    }
                    alt={item.original_title || "Movie Poster"}
                    className="w-full h-auto object-cover"
                  />
                </figure>

                {/* Hidden content, revealed on hover */}
                <div className="card-body opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[300px] transition-all duration-700 ease-in-out">
                  <h2 className="card-title">{item.original_title}</h2>
                  <p className="text-sm overflow-hidden line-clamp-4">
                    {item.overview}
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Details</button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

// --- MoviecardRegion (for region-specific movies) ---
interface MoviecardRegionProps {
  lang: string;
  region: string;
}
const MoviecardRegion = ({ lang, region }: MoviecardRegionProps) => {
  const setMovies = storeRegion((state) => state.setMovies);
  const movies = storeRegion((state) => state.movies);

  useEffect(() => {
    setMovies(lang, region);
  }, [setMovies, lang, region]);

  return (
    <div className="flex flex-row flex-nowrap gap-5 w-max overflow-x-scroll p-5 scroll-hidden">
      {movies?.map((item: MediaResult) => {
        // Use MediaResult
        if (!item.overview) return null;

        return (
          // Link to the generic detail page, explicitly setting mediaType to 'movie'
          <Link
            to={listed.detail
              .replace(":mediaType", "movie")
              .replace(":id", item.id.toString())}
            key={item.id} // Use item.id as key
            className="block"
          >
            <div
              className="group w-60 shadow-xl transition-all duration-900 ease-in-out hover:scale-105 hover:h-auto overflow-hidden relative hover:shadow-sky-800 rounded-xl"
              key={item.id}
            >
              {/* Poster saja yang tampil awal */}
              <figure className="w-full">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/240x360?text=No+Image"
                  }
                  alt={item.original_title || "Movie Poster"}
                  className="w-full h-auto object-cover"
                />
              </figure>

              {/* Konten disembunyikan awal, muncul saat hover */}
              <div className="card-body opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[300px] transition-all duration-700 ease-in-out">
                <h2 className="card-title">{item.original_title}</h2>
                <p className="text-sm overflow-hidden line-clamp-4">
                  {item.overview}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Details</button>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

// --- TvCard (for TV shows) ---
const TvCard = () => {
  // Assuming 'setMovies' in storeTvRegion actually fetches TV shows
  const { setMovies, movies } = storeTvRegion();

  useEffect(() => {
    setMovies();
  }, [setMovies]); // Added dependency array

  return (
    <div className="flex flex-row flex-nowrap gap-5 w-max overflow-x-scroll p-5 scroll-hidden">
      {movies?.map((item: MediaResult) => {
        // Use MediaResult
        if (!item.overview) return null;

        return (
          // Link to the generic detail page, explicitly setting mediaType to 'tv'
          <Link
            to={listed.detail
              .replace(":mediaType", "tv")
              .replace(":id", item.id.toString())}
            key={item.id} // Use item.id as key
            className="block"
          >
            <div
              className="group w-60 shadow-xl transition-all duration-900 ease-in-out hover:scale-105 hover:h-auto overflow-hidden relative hover:shadow-sky-800 rounded-xl"
              key={item.id}
            >
              {/* Poster tampil penuh saat awal */}
              <figure className="w-full">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/240x360?text=No+Image"
                  }
                  alt={item.name || "TV Show Poster"}
                  className="w-full h-auto object-cover"
                />
              </figure>

              {/* Konten disembunyikan dulu, muncul saat hover */}
              <div className="card-body opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[300px] transition-all duration-700 ease-in-out">
                <h2 className="card-title">{item.name}</h2>
                <p className="text-sm overflow-hidden line-clamp-4">
                  {item.overview}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Details</button>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export { MoviecardRegion, Moviecard, TvCard };

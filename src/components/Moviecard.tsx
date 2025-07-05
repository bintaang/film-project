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
            <div className="card bg-base-100 w-60 shadow-xl">
              <figure>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/240x360?text=No+Image"
                  } // Fallback image
                  alt={item.original_title || "Movie Poster"} // Use original_title for movies
                />
              </figure>
              <div className="card-body ">
                <h2 className="card-title">{item.original_title}</h2>
                <p className="h-20 overflow-y-hidden">{item.overview}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Details</button>{" "}
                  {/* Changed from "Buy Now" */}
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
  id: number;
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
            <div className="card bg-base-100 w-60 shadow-xl" key={item.id}>
              <figure>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/240x360?text=No+Image"
                  } // Fallback image
                  alt={item.original_title || "Movie Poster"}
                />
              </figure>
              <div className="card-body ">
                <h2 className="card-title">{item.original_title}</h2>
                <p className="h-20 overflow-y-hidden">{item.overview}</p>
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
            <div className="card bg-base-100 w-60 shadow-xl">
              <figure>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/240x360?text=No+Image"
                  } // Fallback image
                  alt={item.name || "TV Show Poster"} // Use item.name for TV shows
                />
              </figure>
              <div className="card-body ">
                <h2 className="card-title">{item.name}</h2>{" "}
                {/* Use item.name for TV shows */}
                <p className="h-20 overflow-y-hidden">{item.overview}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Details</button>{" "}
                  {/* Changed from "Buy Now" */}
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

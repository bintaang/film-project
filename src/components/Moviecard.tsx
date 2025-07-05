/**
 * MOVIECARD COMPONENTS DOCUMENTATION
 *
 * This file contains three main components for displaying movie and TV show cards:
 * 1. Moviecard - Displays popular movies
 * 2. MoviecardRegion - Displays region-specific movies
 * 3. TvCard - Displays TV shows
 *
 * All components use hover effects to reveal additional information and are fully clickable links.
 */

// Import necessary dependencies
import { useEffect } from "react";
import { storePopular, storeRegion, storeTvRegion } from "../store/movie.store";
import { Link } from "react-router-dom";
import { listed } from "../constant/listed"; // If you want to change routing paths, modify this import

/**
 * MEDIA RESULT INTERFACE
 * Defines the structure for both movies and TV shows data
 * If you want to add more properties (like rating, release date, etc.), add them here
 */
interface MediaResult {
  backdrop_path: string | null;
  id: number;
  original_title?: string; // Used for movies - if you want to change movie title display, look for this property
  name?: string; // Used for TV shows - if you want to change TV show title display, look for this property
  overview: string;
  poster_path: string | null;
}

/**
 * MOVIECARD COMPONENT
 * Displays a horizontal scrollable list of popular movies
 * Each card shows poster initially, reveals details on hover
 */
const Moviecard = () => {
  // Get movie data and setter function from store
  const { setMovies, movies } = storePopular();

  // Fetch movies when component mounts
  // If you want to change when movies are fetched, modify this useEffect
  useEffect(() => {
    setMovies();
  }, [setMovies]);

  return (
    // Main container - if you want to change scroll direction or spacing, modify these classes
    <div className="flex flex-row flex-nowrap gap-5 w-max overflow-x-scroll p-5 scroll-hidden">
      {/* Map through movies array to create cards */}
      {movies?.map((item: MediaResult) => {
        // Skip items without overview - if you want to show all items, remove this condition
        if (!item.overview) return null;

        return (
          // Clickable link wrapper - if you want to change routing behavior, modify the 'to' prop
          <Link
            to={listed.detail
              .replace(":mediaType", "movie") // Sets media type to 'movie'
              .replace(":id", item.id.toString())} // Sets the specific movie ID
            key={item.id}
            className="block"
          >
            {/* Card container with hover effects - if you want to change card size, modify 'w-60' */}
            <div className="group w-60 shadow-xl transition-all duration-900 ease-in-out hover:scale-105 hover:h-auto overflow-hidden relative hover:shadow-sky-800 rounded-xl">
              <div className="card w-full">
                {/* Poster image section */}
                <figure className="w-full">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}` // If you want different image quality, change 'w500'
                        : "https://via.placeholder.com/240x360?text=No+Image" // If you want custom placeholder, change this URL
                    }
                    alt={item.original_title || "Movie Poster"}
                    className="w-full h-auto object-cover"
                  />
                </figure>

                {/* Hidden content that appears on hover - if you want to change animation timing, modify duration classes */}
                <div className="card-body opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[300px] transition-all duration-700 ease-in-out">
                  {/* Movie title */}
                  <h2 className="card-title">{item.original_title}</h2>
                  {/* Movie overview with text truncation - if you want more/less text, modify 'line-clamp-4' */}
                  <p className="text-sm overflow-hidden line-clamp-4">
                    {item.overview}
                  </p>
                  {/* Action button - if you want to change button text or style, modify here */}
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

/**
 * MOVIECARD REGION COMPONENT
 * Displays movies filtered by language and region
 * Props: lang (language code), region (region code)
 * If you want to add more filtering options, add them to this interface
 */
interface MoviecardRegionProps {
  lang: string;
  region: string;
}

const MoviecardRegion = ({ lang, region }: MoviecardRegionProps) => {
  // Get region-specific movie data and setter
  const setMovies = storeRegion((state) => state.setMovies);
  const movies = storeRegion((state) => state.movies);

  // Fetch movies based on language and region - if you want to add more parameters, modify this call
  useEffect(() => {
    setMovies(lang, region);
  }, [setMovies, lang, region]);

  return (
    // Same layout as Moviecard - if you want different styling for region cards, modify these classes
    <div className="flex flex-row flex-nowrap gap-5 w-max overflow-x-scroll p-5 scroll-hidden">
      {movies?.map((item: MediaResult) => {
        if (!item.overview) return null;

        return (
          <Link
            to={listed.detail
              .replace(":mediaType", "movie")
              .replace(":id", item.id.toString())}
            key={item.id}
            className="block"
          >
            <div
              className="group w-60 shadow-xl transition-all duration-900 ease-in-out hover:scale-105 hover:h-auto overflow-hidden relative hover:shadow-sky-800 rounded-xl"
              key={item.id}
            >
              {/* Poster display */}
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

              {/* Hidden content revealed on hover */}
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

/**
 * TV CARD COMPONENT
 * Displays TV shows in the same format as movies
 * Uses 'name' property instead of 'original_title' for TV shows
 */
const TvCard = () => {
  // Get TV show data from store
  const { setMovies, movies } = storeTvRegion();

  // Fetch TV shows when component mounts
  useEffect(() => {
    setMovies();
  }, [setMovies]);

  return (
    <div className="flex flex-row flex-nowrap gap-5 w-max overflow-x-scroll p-5 scroll-hidden">
      {movies?.map((item: MediaResult) => {
        if (!item.overview) return null;

        return (
          // Link to TV show detail page - note mediaType is set to 'tv'
          <Link
            to={listed.detail
              .replace(":mediaType", "tv") // If you want to change TV routing, modify this
              .replace(":id", item.id.toString())}
            key={item.id}
            className="block"
          >
            <div
              className="group w-60 shadow-xl transition-all duration-900 ease-in-out hover:scale-105 hover:h-auto overflow-hidden relative hover:shadow-sky-800 rounded-xl"
              key={item.id}
            >
              {/* TV show poster */}
              <figure className="w-full">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/240x360?text=No+Image"
                  }
                  alt={item.name || "TV Show Poster"} // Uses 'name' for TV shows
                  className="w-full h-auto object-cover"
                />
              </figure>

              {/* Hidden content for TV shows */}
              <div className="card-body opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[300px] transition-all duration-700 ease-in-out">
                {/* TV show title uses 'name' property */}
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

// Export all components for use in other files
export { MoviecardRegion, Moviecard, TvCard };

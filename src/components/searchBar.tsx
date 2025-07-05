// React hooks for state management and DOM references
import { useState, useEffect, useRef } from "react";
// Store hooks for fetching movie data from different sources
import { storePopular, storeRegion, storeTvRegion } from "../store/movie.store";
// React Router for navigation between pages
import { Link } from "react-router-dom";
// Route constants for URL generation
import { listed } from "../constant/listed";

// Interface defining the structure of movie/TV show data
// If you want to change the data structure, modify this interface
interface MediaResult {
  id: number;
  original_title?: string; // For movies
  name?: string; // For TV shows
  overview: string;
  poster_path: string | null;
}

const SearchBar = () => {
  // State for storing the search query typed by user
  // If you want to change initial search state, modify the empty string here
  const [query, setQuery] = useState("");
  // Reference to the input element for focus management
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetching data from different movie stores
  // If you want to add more data sources, add them here
  const popular = storePopular((state) => state.movies);
  const region = storeRegion((state) => state.movies);
  const tv = storeTvRegion((state) => state.movies);

  // Combining all movie/TV data into a single array for searching
  // If you want to change which data sources to search, modify this array
  const all: MediaResult[] = [...popular, ...region, ...tv];

  // Filtering logic - searches through titles based on user input
  // If you want to change search behavior (e.g., search in overview), modify this filter
  const filtered = all.filter((item) => {
    const title = item.original_title || item.name || "";
    return title.toLowerCase().includes(query.toLowerCase());
  });

  // Effect to focus the input when user starts typing
  // If you want to change focus behavior, modify this useEffect
  useEffect(() => {
    if (query && inputRef.current) {
      inputRef.current.focus();
    }
  }, [query]);

  return (
    <>
      {/* Static search bar - shown when user hasn't typed anything */}
      {/* If you want to change the initial search bar appearance, modify this section */}
      {!query && (
        <div className="flex justify-center mt-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies or TV shows..." // Change placeholder text here
            className="blue-3 text-white shadow-2xl placeholder:text-gray-400 rounded-md px-5 py-3 focus:outline-none transition-all duration-300 ease-in-out w-100 hover:w-120 hover:shadow-sky-700 h-10 hover:h-20" // Change styling here
          />
        </div>
      )}

      {/* Overlay search results - shown when user is typing */}
      {/* If you want to change the overlay appearance, modify this section */}
      {query && (
        <div className="w-full min-h-screen blue-gradient bg-opacity-40 absolute top-0 left-0 p-6 flex flex-col items-center z-40 transition-all duration-500 ease-in-out">
          {/* Close button - clears the search query */}
          {/* If you want to change close button styling, modify this button */}
          <button
            onClick={() => setQuery("")}
            className="mb-4 self-start shadow-xl shadow-sky-900 p-2 w-30 blue-3 text-white rounded transition-all duration-500 ease-in-out hover:shadow-sky-500"
          >
            Close
          </button>
          {/* Search overlay title */}
          {/* If you want to change the title text, modify this h2 */}
          <h2 className="text-3xl font-bold text-white mb-6">
            Search your Movies
          </h2>

          {/* Search input in overlay mode */}
          {/* If you want to change the focused search input styling, modify this input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies or TV shows..." // Change placeholder text here
            className="bg-gray-800 text-white placeholder:text-gray-400 rounded-md px-4 py-2 focus:outline-none transition-all duration-300 ease-in-out w-52 hover:w-80" // Change styling here
          />

          {/* Results grid container */}
          {/* If you want to change the grid layout, modify this div */}
          <div className="mt-8 flex flex-wrap gap-6 justify-center w-full max-w-screen-xl px-4 transition-all duration-500 ease-in-out">
            {filtered.length > 0 ? (
              // Mapping through filtered results to display movie/TV show posters
              filtered.map((item) => (
                <Link
                  key={item.id}
                  // Dynamic route generation - determines if it's a movie or TV show
                  // If you want to change routing logic, modify this to prop
                  to={listed.detail
                    .replace(":mediaType", item.original_title ? "movie" : "tv")
                    .replace(":id", item.id.toString())}
                  onClick={() => setQuery("")} // Clears search when user clicks on result
                >
                  {/* Movie/TV show poster image */}
                  {/* If you want to change image styling or size, modify this img */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} // TMDB image URL - change w500 for different sizes
                    alt={item.original_title || item.name}
                    className="w-[200px] h-[300px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out" // Change dimensions and styling here
                  />
                </Link>
              ))
            ) : (
              // No results message
              // If you want to change the "no results" message, modify this paragraph
              <p className="text-white mt-8 text-lg">No results found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;

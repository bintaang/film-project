import { useState, useEffect, useRef } from "react";
import { storePopular, storeRegion, storeTvRegion } from "../store/movie.store";
import { Link } from "react-router-dom";
import { listed } from "../constant/listed";

interface MediaResult {
  id: number;
  original_title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const popular = storePopular((state) => state.movies);
  const region = storeRegion((state) => state.movies);
  const tv = storeTvRegion((state) => state.movies);

  const all: MediaResult[] = [...popular, ...region, ...tv];

  const filtered = all.filter((item) => {
    const title = item.original_title || item.name || "";
    return title.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    if (query && inputRef.current) {
      inputRef.current.focus();
    }
  }, [query]);

  return (
    <>
      {/* Static search bar (visible when not typing) */}
      {!query && (
        <div className="flex justify-center mt-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies or TV shows..."
            className="blue-3 text-white shadow-2xl placeholder:text-gray-400 rounded-md px-5 py-3 focus:outline-none transition-all duration-300 ease-in-out w-100 hover:w-120 hover:shadow-sky-700 h-10 hover:h-20"
          />
        </div>
      )}

      {/* Overlay result when typing */}
      {query && (
        <div className="w-full min-h-screen blue-gradient bg-opacity-40 absolute top-0 left-0 p-6 flex flex-col items-center z-40 transition-all duration-500 ease-in-out">
          <button
            onClick={() => setQuery("")}
            className="mb-4 self-start shadow-xl shadow-sky-900 p-2 w-30 blue-3 text-white rounded transition-all duration-500 ease-in-out hover:shadow-sky-500"
          >
            Close
          </button>
          <h2 className="text-3xl font-bold text-white mb-6">
            Search your Movies
          </h2>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies or TV shows..."
            className="bg-gray-800 text-white placeholder:text-gray-400 rounded-md px-4 py-2 focus:outline-none transition-all duration-300 ease-in-out w-52 hover:w-80"
          />

          <div className="mt-8 flex flex-wrap gap-6 justify-center w-full max-w-screen-xl px-4 transition-all duration-500 ease-in-out">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <Link
                  key={item.id}
                  to={listed.detail
                    .replace(":mediaType", item.original_title ? "movie" : "tv")
                    .replace(":id", item.id.toString())}
                  onClick={() => setQuery("")}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.original_title || item.name}
                    className="w-[200px] h-[300px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </Link>
              ))
            ) : (
              <p className="text-white mt-8 text-lg">No results found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;

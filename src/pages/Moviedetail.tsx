import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { storePopular, storeRegion, storeTvRegion } from "../store/movie.store";
import Navbar from "../components/Navbar";
import { listed } from "../constant/listed";

//
interface MediaResult {
  backdrop_path: string | null;
  id: number;
  original_title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string; mediaType: string }>();
  const navigate = useNavigate();

  // Get data from all stores
  const popularMovies = storePopular((state) => state.movies);
  const regionMovies = storeRegion((state) => state.movies);
  const tvShows = storeTvRegion((state) => state.movies);

  // Combine all results
  const allMovies: MediaResult[] = [
    ...popularMovies,
    ...regionMovies,
    ...tvShows,
  ];

  // Find the item by id
  const item = allMovies.find((movie) => movie.id.toString() === id);

  if (!item) {
    return (
      <div className="p-4 text-center">
        <div>
          <Navbar />,
        </div>
        <h1 className="text-2xl font-bold">Item Not Found</h1>
        <p>The movie you are looking for does not exist.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="blue-gradient min-h-screen overflow-x-hidden">
      <div className="p-5">
        <Navbar />
      </div>
      <div className="p-5 ml-5 blue-2 w-max rounded-2xl shadow-blue-950 shadow-2xl border border-sky-600 transition-all duration-500 ease-in-out hover:border-sky-700">
        <button onClick={() => navigate("/")} className="cursor-pointer">
          Go Back Home
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 p-4 sm:p-6 lg:p-10 w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          alt={item.original_title || item.name}
          className="w-full max-w-md mx-auto lg:mx-0 rounded-lg"
        />
        {/* Detail-info */}
        <div className="flex flex-col justify-center text-center lg:text-left px-4">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {item.original_title || item.name}
          </h2>
          <div className="flex flex-col gap-20">
            <p className="text-gray-400 text-sm  sm:text-base md:text-lg">
              {item.overview}
            </p>
            <div className="z-20 bg-">
              <button className="btn btn-primary btn-sm rounded-xl w-80 p-8 blue-5 border-sky-800 shadow-2xl shadow-gray-700 transition-all duration-1000 ease-in-out hover:border-sky-700 hover:shadow-sky-700 hover:blue-gradient">
                Watch
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row overflow-x-auto items-start p-10 scroll-hidden">
        {/* Removed space-x-4 from here, we'll control spacing manually per item */}
        {allMovies.map(
          (
            movie, // Added index for potential first-item adjustment
          ) => (
            <div key={movie.id}>
              <div
                className="card card-side flex flex-row shadow-sm h-full
                         transition-all duration-300 ease-in-out
                         group overflow-hidden scroll-hidden"
              >
                <figure className="flex-shrink-0 w-100  h-full p-0 m-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.original_title || movie.name}
                    className="object-cover w-full h-full block"
                  />
                </figure>

                {/* //DETAIL-INFO// */}
                <div
                  className="card-body p-4 w-0 opacity-0 flex-shrink-0
                           group-hover:w-[250px] group-hover:opacity-100
                           transition-all duration-300 ease-in-out
                           group-hover:shadow-2xl group-hover:shadow-sky-500"
                  // This remains the same for the slide-in details
                >
                  <h2 className="card-title text-3xl font-bold">
                    {movie.original_title || movie.name}
                  </h2>
                  <p className="text-sm line-clamp-4 justify-center">
                    {movie.overview}
                  </p>
                  <Link
                    to={listed.detail
                      .replace(":mediaType", "movie")
                      .replace(":id", item.id.toString())}
                    className="btn btn-primary btn-sm" // Apply button styles directly to Link
                  >
                    Watch
                  </Link>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default MovieDetail;

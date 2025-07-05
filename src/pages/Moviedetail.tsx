import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storePopular, storeRegion, storeTvRegion } from "../store/movie.store";


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
    <div className="p-8 max-w-4xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg mt-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-200"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex-shrink-0">
          <img
            src={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "https://via.placeholder.com/240x360?text=No+Image"
            }
            alt={item.original_title || item.name || "Poster"}
            className="w-full h-auto object-cover rounded-lg shadow-xl"
            style={{ maxHeight: "500px" }}
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-3 text-blue-400">
              {item.original_title || item.name}
            </h1>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {item.overview}
            </p>
          </div>

          <div className="mt-8">
            <button className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-200 text-lg">
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

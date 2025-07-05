import { useEffect, useState } from "react";
import { storePopular } from "../store/movie.store";
import { useNavigate } from "react-router-dom";
import { listed } from "../constant/listed";

interface MediaResult {
  id: number;
  poster_path: string | null;
  original_title?: string;
  overview: string;
}

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const setMovies = storePopular((state) => state.setMovies);
  const popular: MediaResult[] = storePopular((state) => state.movies);

  useEffect(() => {
    setMovies();
  }, [setMovies]);

  // Auto slide every 4 seconds
  useEffect(() => {
    if (!popular || popular.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % popular.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [popular]);

  if (!popular || popular.length === 0) {
    return (
      <div className="h-[500px] bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[700px] overflow-hidden rounded-2xl">
      {popular.map((movie, i) => (
        <div
          key={movie.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.original_title}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001523] to-transparent z-30" />

          {/* Content */}
          <div className="absolute z-40 bottom-10 left-10 text-white max-w-screen-md">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
              {movie.original_title}
            </h1>
            <p className="text-base mb-4 line-clamp-2 drop-shadow-md">
              {movie.overview}
            </p>
            <button
              onClick={() =>
                navigate(
                  listed.detail
                    .replace(":mediaType", "movie")
                    .replace(":id", movie.id.toString()),
                )
              }
              className="btn btn-primary btn-sm rounded-xl w-1/2 p-8 blue-5 border-sky-800 shadow-2xl shadow-gray-700 transition-all duration-1000 ease-in-out hover:border-sky-700 hover:shadow-sky-700 hover:blue-gradient"
            >
              Watch Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;

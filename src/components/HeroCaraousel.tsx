import { useEffect, useState } from "react";
import { storePopular } from "../store/movie.store";
import { useNavigate } from "react-router-dom";
import { listed } from "../constant/listed";

//MAKING INTERFACE FOR THE IMAGE OUTPUT
interface MediaResult {
  id: number;
  poster_path: string | null;
  original_title?: string;
  overview: string;
}

//CARAOUSEL LOGIC
// Here you can read the logic for the carousel
const HeroCarousel = () => {
  const navigate = useNavigate(); //Make a variable for the navigate function
  const [index, setIndex] = useState(0); //Make a variable for the index state

  const setMovies = storePopular((state) => state.setMovies); //Make a variable for the setMovies function
  const popular: MediaResult[] = storePopular((state) => state.movies); //Make a variable for the popular movies array

  //Data fetching for current movies
  useEffect(() => {
    setMovies();
  }, [setMovies]);

  // Auto slide every 4 seconds
  useEffect(() => {
    // Check if it has no movies - if so, stop here
    if (!popular || popular.length === 0) return;

    // Create a timer that runs every 4 seconds
    const interval = setInterval(() => {
      // Move to the next slide (goes back to first slide after the last one)
      setIndex((prev) => (prev + 1) % popular.length);
    }, 4000); // 4000 milliseconds = 4 seconds

    // Clean up the timer when component unmounts or updates
    return () => clearInterval(interval);
  }, [popular]); // Run this effect again when popular movies change

  // Show loading screen if we don't have any movies yet
  if (!popular || popular.length === 0) {
    return (
      <div className="h-[500px] bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    // Main carousel container - if you want to change height, modify h-[700px]
    // If you want to change border radius, modify rounded-2xl
    <div className="relative w-full h-[700px] overflow-hidden rounded-2xl">
      {/* Loop through each movie to create individual slides */}
      {popular.map((movie, i) => (
        <div
          key={movie.id}
          // Each slide is positioned absolutely and stacked on top of each other
          // Only the current slide (i === index) is visible with opacity-100
          // If you want to change animation speed, modify duration-1000
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {/* Movie poster image - covers the entire slide */}
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.original_title}
            // If you want to change how the image fits, modify object-cover
            className="w-full h-full object-cover"
          />

          {/* Dark gradient overlay to make text readable */}
          {/* If you want to change the gradient color, modify from-[#001523] */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001523] to-transparent z-30" />

          {/* Text content section positioned at bottom-left */}
          {/* If you want to change position, modify bottom-10 left-10 */}
          <div className="absolute z-40 bottom-10 left-10 text-white max-w-screen-md">
            {/* Movie title */}
            {/* If you want to change title size, modify text-4xl */}
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
              {movie.original_title}
            </h1>
            {/* Movie description - limited to 2 lines */}
            {/* If you want to change number of lines, modify line-clamp-2 */}
            <p className="text-base mb-4 line-clamp-2 drop-shadow-md">
              {movie.overview}
            </p>
            {/* Watch Now button - navigates to movie detail page */}
            <button
              onClick={() =>
                navigate(
                  listed.detail
                    .replace(":mediaType", "movie")
                    .replace(":id", movie.id.toString()),
                )
              }
              // If you want to change button styling, modify these classes
              // If you want to change button width, modify w-1/2
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

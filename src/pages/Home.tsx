import Navbar from "../components/Navbar";
import { MoviecardRegion, Moviecard, TvCard } from "../components/Moviecard";
import MovieSearch from "../components/searchBar";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCaraousel";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col blue-gradient text-white overflow-x-hidden">
      <div className="p-5">
        <Navbar />
      </div>
      <MovieSearch />
      <div className="p-5">
        <HeroCarousel />
      </div>

      <main className="flex-1 overflow-scroll scroll-hidden">
        <h1 className="p-5 text-4xl font-bold">Today's Top Movie</h1>
        <Moviecard />
      </main>
      <div className="flex flex-col overflow-x-scroll scroll-hidden">
        <h1 className="p-5 text-4xl font-bold">For Indonesian Folks</h1>
        <MoviecardRegion lang="en-US" region="ID" />
      </div>
      <div className="flex flex-col overflow-x-scroll scroll-hidden">
        <h1 className="p-5 text-4xl font-bold">Indonesian Top TV Shows</h1>
        <TvCard />
      </div>

      <Footer />
    </div>
  );
};

export default Home;

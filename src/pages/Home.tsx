import Navbar from "../components/Navbar";
import { MoviecardRegion, Moviecard, TvCard } from "../components/Moviecard";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-1 overflow-scroll scroll-hidden">
        <Moviecard />
      </main>
      <div className="flex flex-col overflow-x-scroll scroll-hidden">
        <MoviecardRegion lang="en-US" region="ID" />
      </div>
      <div className="flex flex-col overflow-x-scroll scroll-hidden">
        <TvCard />
      </div>

      <Footer />
    </div>
  );
};

export default Home;

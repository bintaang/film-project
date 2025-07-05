// Example: src/router.ts or src/routes/index.ts
import Home from "../pages/Home"; // Corrected import
import MovieDetail from "../pages/Moviedetail";
import { listed } from "./listed"; // Assuming listed.ts exists at this path
import { createBrowserRouter } from "react-router-dom";

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: listed.home,
    element: <Home />,
  },
  {
    path: listed.detail,
    element: <MovieDetail />,
  },
]);

export default Route;

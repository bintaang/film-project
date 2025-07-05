/**
 * Router Configuration
 * This file sets up the main routing for the application using React Router DOM
 *
 * To modify routes:
 * - Add new page imports at the top
 * - Add new route objects to the Route array
 * - Update path values in the listed object if needed
 */

// Import page components - if you want to add new pages, import them here
import Home from "../pages/Home"; // Home page component
import MovieDetail from "../pages/Moviedetail"; // Movie detail page component
import { listed } from "./listed"; // Route path constants - if you want to change URLs, modify the listed.ts file
import { createBrowserRouter } from "react-router-dom"; // React Router DOM browser router

// Main router configuration - if you want to add new routes, add them to this array
const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: listed.home, // Home page route path
    element: <Home />, // Component to render for home page
  },
  {
    path: listed.detail, // Movie detail page route path
    element: <MovieDetail />, // Component to render for movie detail page
  },
  // If you want to add more routes, add them here following the same pattern:
  // {
  //   path: "your-path",
  //   element: <YourComponent />,
  // },
]);

export default Route;

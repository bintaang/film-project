// Import the logo image - if you want to change the logo, replace the path here
import logo from "../assets/icon.png";

/**
 * Navbar Component
 * A responsive navigation bar with dropdown menu, logo, and notification button
 * Uses DaisyUI classes for styling
 */
const Navbar = () => {
  return (
    // Main navbar container - if you want to change colors/shadows, modify the classes here
    <div className="navbar blue-2 shadow-xs shadow-sky-900 rounded-2xl p-5 transition-all duration-500 ease-in-out hover:shadow-sky-700">
      {/* Left section - Dropdown hamburger menu */}
      <div className="navbar-start">
        <div className="dropdown">
          {/* Hamburger menu button - if you want to change the icon, replace the SVG here */}
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>

          {/* Dropdown menu content - if you want to add/remove/change menu items, modify the <li> elements here */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Center section - Logo */}
      <div className="navbar-center">
        {/* Logo button - if you want to change logo size, modify w-20 h-20 classes here */}
        <a className="btn btn-ghost">
          <img src={logo} className="w-20 h-20" alt="Logo" />
        </a>
      </div>

      {/* Right section - Notification button */}
      <div className="navbar-end">
        {" "}
        {/* Notification bell button - if you want to change the notification icon, replace the SVG here */}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{" "}
            </svg>
            {/* Notification badge - if you want to hide/show or change badge style, modify this span */}
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if user is logged in by looking for the username in localStorage
  const isLoggedIn = localStorage.getItem("username");

  const handleSignOut = () => {
    // Remove user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    // Redirect to the home page
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a
          className="logo"
          href="/"
          style={{ textDecoration: "none", color: "black" }}
        >
          ZENVIBE
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-journal">
                My Journal
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/browse-quotes">
                Browse Quotes
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <a className="nav-link btn btn-link" onClick={handleSignOut} style={{ textDecoration: 'none', color: 'inherit' }}>
                  Sign Out
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


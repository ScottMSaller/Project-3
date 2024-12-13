import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
        <div className="contact-info"></div>
        <div className="logo">ZENVIBE</div>
        <ul className="nav-links">
          <li><Link className="link" to="/">Home</Link></li>
          <li><Link className="link" to="/login">Login</Link></li>
          <li><Link className="link" to="/contact">Contact</Link></li>
          <li><Link className="link" to="/my-journal">My Journal</Link></li>
        </ul>
        </div>)
}

export default Navbar;
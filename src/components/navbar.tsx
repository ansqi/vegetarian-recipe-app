import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

export const Navbar = () => {
  return (
    <nav className="navigation">
      <img className="navigation-logo" src={logo} alt="Logo" />
      <span className="navigation-title">react vegapp</span>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

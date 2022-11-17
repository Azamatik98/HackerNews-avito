import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Hacker News</h1>
      <nav className="nav-center">
        <Link to="/" className="nav-link">
          Main
        </Link>
      </nav>
    </header>
  );
};

export default Header;

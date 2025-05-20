import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>

        <Link to="/login">
          <li>Login</li>
        </Link>

        <Link to="/register">
          <li>Register</li>
        </Link>

        <Link to="/logout">
          <li>Logout</li>
        </Link>

      </ul>
    </div>
  );
};

export default Navbar;

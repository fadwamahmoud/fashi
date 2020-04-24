import { BrowserRouter, Route, Link, Switch, NavLink } from "react-router-dom";
import React from "react";

const NavBar = (props) => {
  return (
    <header class="header-section">
      <div className="header-top">
        <div className="container">
          <div className="ht-left">
            <div className="phone-service">
              <Link className="dark" to="/">
                Shop
              </Link>
            </div>
            <div className="phone-service">
              <Link className="dark" to="/login">
                Login
              </Link>
            </div>

            <div className="phone-service">
              <Link className="dark" to="/admin">
                Admin
              </Link>
            </div>
          </div>
          <div className="ht-right">
            <div className="lan-selector"></div>
            <div className="top-social">
              <a href="#">
                <i className="ti-facebook"></i>
              </a>
              <a href="#">
                <i className="ti-twitter-alt"></i>
              </a>
              <a href="#">
                <i className="ti-linkedin"></i>
              </a>
              <a href="#">
                <i className="ti-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

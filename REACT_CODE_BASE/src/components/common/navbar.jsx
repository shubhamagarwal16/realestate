import React from "react";
import { NavLink, Link } from "react-router-dom";

import "../../assets/styles/header&footer&navbar.css";

const Navbar = ({ navItems }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md bg-danger navbar-dash nav-dash">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
          onClick={() => setShowMenu(!showMenu)}
        >
          <i className="fa fa-bars text-white" aria-hidden="true"></i>
        </button>
        <div className={`${showMenu ? 'show-collapsed-menu' : 'collapse'} navbar-collapse`} id="collapsibleNavbar">
          <div className="container">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <Link className="nav-link pl-3" to="/">
                  <span className="d-none d-sm-inline"><i className="fa fa-home" aria-hidden="true" /> |</span>
                  <span className="d-sm-none">Home</span>
                </Link>
              </li>
              {navItems.map(item => (
                <li key={item.name} className="nav-item clickable">
                  <NavLink className="nav-link pl-3" to={item.path}>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;

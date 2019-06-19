import React from "react";
import { Link } from "react-router-dom";
import Form from "./form";
import { Dropdown } from "react-bootstrap";

import LOGO from "../../assets/images/Logo_SA.png";
import userImg from "../../assets/images/user.jpg";
import * as authService from "../../services/authService";
import LoginModal from "../auth/loginModal";
import Navbar from "./navbar";
import CommonUIAddons from "./commonAddons";
import queryString from "query-string";

var togglePageLoaderFlag = false;

class Header extends Form {
  state = {
    loginModalToggle: false,
    navItems: [
      { path: "/users/dashboard", name: "Dashboard" },
      { path: "/property/new", name: "Add New Property" },
      { path: "/property/search", name: "Find Property" },
      { path: "/property/listing/all", name: "My Listing" },
      { path: "/users/profile/edit", name: "My Profile" }
    ]
  };

  componentDidUpdate() {
    console.log("Header ", this.props, this.state.loginModalToggle);
    const { location } = this.props;
    const locationState = (location && location.state) || {};
    let queryParams = {};
    if (
      locationState &&
      locationState.loginModalToggle &&
      !this.state.loginModalToggle
    )
      this.toggleLoginModal();
    else if (location && location.search && !this.state.loginModalToggle) {
      queryParams = queryString.parse(location.search);
      if (queryParams && queryParams.action === "signUpsuccess")
        this.toggleLoginModal();
    }
    console.log({ queryParams });
  }

  toggleLoginModal = () => {
    let loginModalToggle = this.state.loginModalToggle;
    console.log("toggleLoginModal ", loginModalToggle);
    loginModalToggle = !loginModalToggle;
    this.setState({ loginModalToggle });
    // this.props.history.push("/");
  };

  setLoggedInUser = user => {
    this.setState({ user });
  };

  handleLogout = () => {
    const isLoggedOut = authService.logOut();
    if (isLoggedOut) window.location = "/";
  };

  render() {
    const { loginModalToggle, navItems } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <header style={{ marginBottom: "0px" }} className="">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Link to="/">
                  <img
                    src={LOGO}
                    className="p-cursor"
                    width="50px"
                    alt="LOGO"
                  />
                </Link>
              </div>
              <div className="col-md-8">
                <div className="header-ryt text-right">
                  {/* <!-- <a routerLink="/" >Home</a>                  
                            <a routerLink="/" >Find Property</a> --> */}
                  {!user && (
                    <React.Fragment>
                      <button
                        type="button"
                        style={{ marginRight: "5px" }}
                        className="btn btn-outline-primary btn-sm"
                        onClick={this.toggleLoginModal}
                      >
                        Login
                      </button>
                      <Link
                        to="/sign-up"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Register
                      </Link>
                    </React.Fragment>
                  )}
                  {user && (
                    <div className="user-image">
                      <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                          <span>
                            <span className="text-danger">Welcome </span>
                            {(user && user.fname) || ""}
                          </span>
                          <img
                            src={userImg}
                            className="rounded-circle p-cursor"
                            alt="user"
                            width="50px"
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Another action
                          </Dropdown.Item>
                          <button
                            onClick={this.handleLogout}
                            className="btn btn-light"
                          >
                            Logout
                          </button>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    // <mat-menu #headerRytmenu="matMenu" xPosition="before">
                    //       <button routerLink="/users/dashboard" mat-menu-item>Dashboard</button>
                    //       <button *ngIf="userService.currentUser?.user.isAdmin" routerLink="/admin/dashboard" mat-menu-item>Admin</button>
                    //       <button (click)="loginService.logOut()" mat-menu-item>Logout</button>
                    //   </mat-menu>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ---------------------- LOGIN MODAL ----------------------------- */}
        <LoginModal
          toggle={loginModalToggle}
          toggleLoginModal={this.toggleLoginModal}
          setLoggedInUser={this.setLoggedInUser}
          {...this.props}
        />
        {/* ---------------------- LOGIN MODAL ----------------------------- */}
        {user && <Navbar navItems={navItems} />}
        <CommonUIAddons pageLoaderFlag={togglePageLoaderFlag} />
      </React.Fragment>
    );
  }
}

export const togglePageLoader = () => {
  togglePageLoaderFlag = !togglePageLoaderFlag;
};

export default Header;

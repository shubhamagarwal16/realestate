import React from "react";
import { Link } from "react-router-dom";
import Form from "./form";
import { Dropdown, Alert } from "react-bootstrap";

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
      { path: "/users/profile", name: "My Profile" }
    ],
    alertNotification: {
      status: false,
      message: "",
      variant: ""
    }
  };

  componentDidUpdate() {
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams) {
      // ============= NEW USER ===============
      if (
        queryParams.action === "signUpsuccess" &&
        queryParams.modal === "open"
      ) {
        this.setState({
          alertNotification: {
            status: true,
            message: "Congratulations! You have registered successfully..",
            variant: "success"
          }
        });
        this.toggleLoginModal();
      }
      // =============== LOGOUT ===================
      else if (
        queryParams.action === "logOut" &&
        queryParams.control === "completed"
      ) {
        this.refineQueryParams();

        this.setState({
          alertNotification: {
            status: true,
            message: "You have logged out successfully..",
            variant: "primary"
          }
        });
      }
      // ============== PROTECTED URL =============
      else if (queryParams.redirectUrl && queryParams.modal === "open") {
        this.toggleLoginModal();

        this.setState({
          alertNotification: {
            status: true,
            message: "Kindly login to continue..",
            variant: "info"
          }
        });
      }
    }
  }

  refineQueryParams = () => {
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams) {
      if (queryParams.modal === "open") delete queryParams.modal;
      if (queryParams.control === "completed") delete queryParams.control;

      const stringified = queryString.stringify(queryParams);
      // console.log(stringified);
      this.props.history.push(`?${stringified}`);
    }
  };

  toggleLoginModal = () => {
    this.refineQueryParams();

    let loginModalToggle = this.state.loginModalToggle;
    loginModalToggle = !loginModalToggle;
    this.setState({ loginModalToggle });
  };

  setLoggedInUser = user => {
    this.setState({ user });
  };

  handleLogout = () => {
    const isLoggedOut = authService.logOut();
    if (isLoggedOut) window.location = "/?action=logOut&control=completed";
  };

  handleAlertDismiss = () => {
    this.setState({
      alertNotification: { status: false, message: "", variant: " " }
    });
  };

  render() {
    const { loginModalToggle, navItems, alertNotification } = this.state;
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
                      <Dropdown alignRight>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                          <span>
                            <span className="text-danger">Welcome </span> &nbsp;
                            {(user && user.fname) || ""}
                          </span>
                          &nbsp;
                          <img
                            src={userImg}
                            className="rounded-circle p-cursor"
                            alt="user"
                            width="50px"
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {user && user.isAdmin && (
                            <Dropdown.Item href="/admin">
                              {/* <Link
                                to="/admin"
                                className="btn btn-light btn-block"
                              >
                              </Link> */}
                              Admin Dashboard
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item>
                            <button
                              onClick={this.handleLogout}
                              className="btn btn-light btn-block"
                            >
                              Logout
                            </button>
                          </Dropdown.Item>
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

        {/* =================== ALERT MESSAGE =================== */}
        {alertNotification.status && (
          <div className="container mt-3">
            <Alert
              variant={alertNotification.variant}
              onClose={this.handleAlertDismiss}
              dismissible
            >
              {alertNotification.message}
            </Alert>
          </div>
        )}
        {/* =================== ALERT MESSAGE =================== */}
      </React.Fragment>
    );
  }
}

export const togglePageLoader = () => {
  togglePageLoaderFlag = !togglePageLoaderFlag;
};

export default Header;

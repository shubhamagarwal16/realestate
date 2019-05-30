import React from "react";
import { Link } from "react-router-dom";
import Form from "./form";

import LOGO from "../../assets/images/Logo_SA.png";
import LoginModal from "../auth/loginModal";

class Header extends Form {
  state = {
    loginModalToggle: false
  };

  toggleLoginModal = () => {
    let loginModalToggle = this.state.loginModalToggle;
    loginModalToggle = !loginModalToggle;
    this.setState({ loginModalToggle });
  };

  render() {
    const { loginModalToggle } = this.state;
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
                  <button
                    type="button"
                    style={{ marginRight: "5px" }}
                    className="btn btn-outline-primary btn-sm"
                    onClick={this.toggleLoginModal}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ---------------------- LOGIN MODAL ----------------------------- */}
        <LoginModal
          toggle={loginModalToggle}
          toggleLoginModal={this.toggleLoginModal}
        />
        {/* ---------------------- LOGIN MODAL ----------------------------- */}
      </React.Fragment>
    );
  }
}

export default Header;

import React from "react";

import "../../assets/styles/header&footer&navbar.scss";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <p>&copy; RealEstate</p>
            </div>
            <div className="col-6">
              <p className="text-right">
                <a target="_blank" href="https://github.com/shubhamagarwal16/">
                  Developer url
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;

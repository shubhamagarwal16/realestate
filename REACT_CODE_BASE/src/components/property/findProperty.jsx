import React, { Component } from "react";

class FindProperty extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-3 filterBox">
              <div>
                <h4>
                  Filters
                  <a className="text-info">clear</a>
                </h4>
                <button className="btn btn-danger btn-sm">Search</button>
                <div className="card">
                  <h5>
                    Property For:
                    <i className="fa fa-plus-square-o float-right" />
                  </h5>
                  <hr className="hr" />
                  <label htmlFor="propertyForBuy">
                    <input
                      type="checkbox"
                      name="propertyFor"
                      id="propertyForBuy"
                    />
                    Buy
                  </label>
                  <label htmlFor="propertyForSell">
                    <input
                      type="checkbox"
                      name="propertyFor"
                      id="propertyForSell"
                    />
                    Sell
                  </label>
                  <h5>
                    Property Type:
                    <i className="fa fa-plus-square-o float-right" />
                  </h5>
                  <hr className="hr" />
                  <div className="optionsBlock" />
                </div>
              </div>
            </div>
            <div className="col-md-6 filteredPropertyBox" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FindProperty;

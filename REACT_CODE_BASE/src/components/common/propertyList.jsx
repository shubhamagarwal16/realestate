import React, { Component } from "react";
import { togglePageLoader } from "./header";

import { get, showGFSImage } from "../../services/commonServices";
import { getCurrentUser } from "../../services/authService";

class PropertyList extends Component {
  state = {
    propertyList: [],
    queryParams: ""
  };

  componentDidMount() {
    this.getPropertyListings();
  }

  componentDidUpdate() {
    if (this.props.queryParams !== this.state.queryParams)
      this.getPropertyListings();
  }

  getPropertyListings = async () => {
    let { queryParams, userId, notUserId, listingCount } = this.props;
    const user = getCurrentUser();
    const queryTemp = this.props.queryParams;

    if (userId && user && user._id) {
      if (queryParams) queryParams += `&userId=${user._id}`;
      else queryParams = `?userId=${user._id}`;
    } else if (notUserId && user && user._id) {
      if (queryParams) queryParams += `&notUserId=${user._id}`;
      else queryParams = `?notUserId=${user._id}`;
    }
    // console.log({ user });

    togglePageLoader();
    const { data: propertyList } = await get(`/property/filter${queryParams}`);
    togglePageLoader();
    if (listingCount) {
      this.props.listingCount(propertyList.length);
    }
    this.setState({ propertyList, queryParams: queryTemp });
  };

  openPropertyPage = slug => {
    return this.props.history.push(`/property/view/${slug}`);
  };

  handleBtnClick = (e, type) => {
    e.preventDefault();
    e.stoppropagation();
    console.log(e, type);
  };

  render() {
    const { propertyList } = this.state;
    let blockClasses = "col-md-4  mt-4";
    if (this.props.blockSize)
      blockClasses = `col-md-${this.props.blockSize}  mt-4`;

    return (
      <React.Fragment>
        {!propertyList.length && (
          <h4 className="text-center text-warning">No data found</h4>
        )}
        <div className="row">
          {propertyList.map(property => (
            <div
              onClick={() => this.openPropertyPage(property.slug)}
              key={property._id}
              className={blockClasses}
            >
              <div className="card clickable">
                <div className="row">
                  <div
                    className={this.props.blockSize === 12 ? "col-3" : "col-12"}
                  >
                    <img
                      src={showGFSImage(property.images[0])}
                      height="120px"
                      className="card-img-top"
                      alt="img"
                    />
                  </div>
                  <div
                    className={this.props.blockSize === 12 ? "col-7" : "col-12"}
                  >
                    <div className="card-body">
                      <h5
                        className={
                          this.props.blockSize === 12
                            ? "card-title"
                            : "card-title text-center"
                        }
                      >
                        {property.title}
                      </h5>
                      <ul
                        className={
                          this.props.blockSize === 12
                            ? "list-unstyled"
                            : "list-unstyled text-center"
                        }
                      >
                        <li>
                          <small>
                            {property.locality}, {property.city.name},{" "}
                            {property.state.name}
                          </small>
                        </li>
                        <li>
                          <small>
                            {property.type.title} <b>|</b> {property.updatedOn}{" "}
                          </small>
                        </li>
                      </ul>
                      <p className="card-text">{property.description}</p>
                    </div>
                  </div>
                  <div
                    className={this.props.blockSize === 12 ? "col-2" : "col-12"}
                  >
                    <div
                      className={
                        this.props.blockSize === 12
                          ? "pt-2 text-left"
                          : "pb-2 text-center"
                      }
                    >
                      <button
                        onClick={event => this.handleBtnClick(event, "edit")}
                        className="btn btn-info btn-sm mt-2"
                      >
                        <small>Edit Property</small>
                      </button>
                      <button
                        onClick={event =>
                          this.handleBtnClick(event, property.propertyFor)
                        }
                        className="btn btn-success btn-sm mt-2"
                      >
                        <small>
                          {property.propertyFor === "sell"
                            ? "Mark as sold"
                            : "Mark as acquired"}
                        </small>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default PropertyList;

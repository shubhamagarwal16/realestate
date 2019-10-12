import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropertyList from "../common/propertyList";

import "../../assets/styles/property.css";

class PropertyListing extends Component {
  state = {
    queryParams: "",
    blockSize: 12,
    listingType: ""
  };

  componentDidMount() {
    this.getUriParam();
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;
    if (
      prevState.listingType !==
      ((match && match.params && match.params.type) || "")
    )
      this.getUriParam();
  }

  getPropertyCount = propertyCount => {
    this.setState({ propertyCount });
  };

  getUriParam = () => {
    const { match } = this.props;
    if (match && match.params && match.params.type) {
      this.filterProperties();
      this.setState({ listingType: match.params.type });
    }
  };

  filterProperties = () => {
    let { queryParams, listingType } = this.state;
    if (listingType === "all") queryParams = "";
    else if (listingType === "active") queryParams = "?status=available";
    else if (listingType === "sold") queryParams = "?status=sold,acquired";
    else if (listingType === "inactive") queryParams = "?status=expired";

    this.setState({ queryParams });
  };

  render() {
    const { queryParams, blockSize, propertyCount, listingType } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="card pt-3 pb-3 pl-2 pr-2 sideMenuSticky ">
                {[
                  {
                    name: "All Properties",
                    uri: "all"
                  },
                  {
                    name: "Active Properties",
                    uri: "active"
                  },
                  {
                    name: "Sold/Acquired",
                    uri: "sold"
                  },
                  {
                    name: "Inactive Properties",
                    uri: "inactive"
                  }
                ].map((ele, index) => (
                  <Link
                    key={index + ele.uri}
                    to={`/property/listing/${ele.uri}`}
                    className={
                      listingType === ele.uri
                        ? "btn btn-sm mb-2 btn-outline-danger"
                        : "btn btn-sm mb-2 btn-danger"
                    }
                  >
                    {ele.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-md-9">
              <h5>Showing {propertyCount} properties</h5>
              <PropertyList
                queryParams={queryParams}
                listingCount={count => this.getPropertyCount(count)}
                userId={true}
                blockSize={blockSize}
                {...this.props}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PropertyListing;

import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropertyList from "../common/propertyList";

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

  getUriParam = () => {
    const { match } = this.props;
    if (match && match.params && match.params.type)
      this.setState({ listingType: match.params.type });
  };

  filterProperties = () => {
    const { queryParams } = this.state;
  };

  render() {
    const { queryParams, blockSize } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="card pt-3 pb-3 pl-2 pr-2">
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
                    className="btn btn-danger btn-sm mb-2"
                  >
                    {ele.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-md-9">
              <PropertyList
                // togglePageLoader={this.props.togglePageLoader}
                queryParams={queryParams}
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

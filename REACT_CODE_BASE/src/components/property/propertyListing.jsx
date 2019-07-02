import React, { Component } from "react";
import PropertyList from "../common/propertyList";

class PropertyListing extends Component {
  state = {
    queryParams: "",
    blockSize: 12
  };
  render() {
    const { queryParams, blockSize } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">zxc</div>
            </div>
            <div className="col-md-8">
              <PropertyList
                // togglePageLoader={this.props.togglePageLoader}
                queryParams={queryParams}
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

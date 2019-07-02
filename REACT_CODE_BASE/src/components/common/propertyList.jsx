import React, { Component } from "react";
import { get, showGFSImage } from "../../services/commonServices";
import { togglePageLoader } from "./header";

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
    let { queryParams: queryProps } = this.props;
    const queryParams = queryProps;
    togglePageLoader();
    const { data: propertyList } = await get(`/property/filter${queryProps}`);
    togglePageLoader();
    this.setState({ propertyList, queryParams });
  };

  openPropertyPage = slug => {
    return this.props.history.push(`/property/view/${slug}`);
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
                    className={this.props.blockSize == 12 ? "col-3" : "col-12"}
                  >
                    <img
                      src={showGFSImage(property.images[0])}
                      height="120px"
                      className="card-img-top"
                      alt="img"
                    />
                  </div>
                  <div
                    className={this.props.blockSize == 12 ? "col-9" : "col-12"}
                  >
                    <div className="card-body">
                      <h5
                        className={
                          this.props.blockSize == 12
                            ? "card-title"
                            : "card-title text-center"
                        }
                      >
                        {property.title}
                      </h5>
                      <ul
                        className={
                          this.props.blockSize == 12
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

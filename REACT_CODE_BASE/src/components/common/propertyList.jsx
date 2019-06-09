import React, { Component } from "react";
import { get, showGFSImage } from "../../services/commonServices";

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
    const { data: propertyList } = await get(`/property/filter${queryProps}`);
    this.setState({ propertyList, queryParams });
  };

  openPropertyPage = slug => {
    return this.props.history.push(`/property/view/${slug}`);
  };

  render() {
    const { propertyList } = this.state;
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
              className="col-md-4 mt-4"
            >
              <div className="card">
                <img
                  src={showGFSImage(property.images[0])}
                  height="120px"
                  className="card-img-top"
                  alt="img"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{property.title}</h5>
                  <ul className="list-unstyled">
                    <li className="text-center">
                      <small>
                        {property.locality}, {property.city.name},{" "}
                        {property.state.name}
                      </small>
                    </li>
                    <li className="text-center">
                      <small>
                        {property.type.title} <b>|</b> {property.updatedOn}{" "}
                      </small>
                    </li>
                  </ul>
                  <p className="card-text">{property.description}</p>
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

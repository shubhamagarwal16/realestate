import React, { Component } from "react";
import * as commonService from "../../services/commonServices";
import PropertyList from "../common/propertyList";
import queryString from "query-string";

import "../../assets/styles/property.css";

class FindProperty extends Component {
  state = {
    propertyTypeList: [],
    cityList: [],
    queryParams: "?status=available",
    blockSize: 6,
    filterData: {
      propertyFor: [],
      type: [],
      city: []
    },
    toggleType: {
      type: "",
      status: false
    }
  };

  async componentDidMount() {
    const { data: propertyTypeList } = await commonService.get(
      "/property/type"
    );

    let cityList = await commonService.renderCityList("");

    cityList = cityList.slice(1);

    this.setState({ propertyTypeList, cityList });
  }

  capitalizeText = val => {
    if (!val) return "";
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  toggleBlockSize = blockSize => {
    this.setState({ blockSize });
  };

  toggleSwitch = toggleType => {
    this.setState({ toggleType });
  };

  manageCheckedValue = (value, location, checked) => {
    // console.log(value, location, checked);
    const filterData = { ...this.state.filterData };

    if (checked) filterData[location].push(value);
    else {
      const index = filterData[location].indexOf(value);
      if (index > -1) filterData[location].splice(index, 1);
    }
    this.setState({ filterData });
  };

  filterProperties = () => {
    const { filterData } = this.state;
    const stringifiedString = queryString.stringify(filterData);

    let queryParams = queryString.stringify(filterData, {
      arrayFormat: "comma"
    });
    queryParams = queryParams
      ? `?${queryParams}&status=available`
      : `?status=available`;

    this.setState({ queryParams });
    this.props.history.push(`?${stringifiedString}`);
  };

  setPropCount = count => {
    console.log("==========", count);
    this.setState({ count });
  };

  clearFilters = () => {
    window.location = "/property/search";
    // this.setState({
    //   queryParams: "",
    //   filterData: {
    //     propertyFor: [],
    //     type: [],
    //     city: []
    //   }
    // });
    // this.props.history.push("/property/search");
  };

  render() {
    const {
      propertyTypeList,
      cityList,
      queryParams,
      blockSize,
      count
    } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="filterBox">
                <h4>
                  Filters
                  <a
                    onClick={this.clearFilters}
                    className="text-info clickable"
                  >
                    <small> clear</small>
                  </a>
                  <button
                    onClick={this.filterProperties}
                    className="btn btn-danger btn-sm float-right"
                  >
                    Search
                  </button>
                </h4>
                <div className="card pt-4 pb-3 pl-3 pr-3 mb-4">
                  <h5>
                    Property For:
                    <i className="fa fa-plus-square-o float-right" />
                    {/* onClick={() => this.toggleSwitch({ "propertyFor",  })}  */}
                  </h5>
                  <hr className="hr" />
                  <div className="row pl-3">
                    {[
                      { key: "sell", val: "buy" },
                      { key: "rent", val: "rent" }
                    ].map((ele, index) => (
                      <div
                        key={"customCheck" + index}
                        className="custom-control custom-checkbox col"
                      >
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          value={ele.val}
                          onChange={event =>
                            this.manageCheckedValue(
                              ele.val,
                              "propertyFor",
                              event.currentTarget.checked
                            )
                          }
                          id={"customCheck" + index}
                        />
                        <label
                          className="custom-control-label clickable"
                          htmlFor={"customCheck" + index}
                        >
                          {this.capitalizeText(ele.key)}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <h5>
                      Property Type:
                      <i className="fa fa-plus-square-o float-right" />
                    </h5>
                    <hr className="hr" />
                    <div className="optionsBlock">
                      {propertyTypeList.map((ele, index) => (
                        <div
                          key={"customPropType" + index}
                          className="custom-control custom-checkbox col"
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            value={ele._id}
                            onChange={event =>
                              this.manageCheckedValue(
                                ele._id,
                                "type",
                                event.currentTarget.checked
                              )
                            }
                            id={"customPropType" + index}
                          />
                          <label
                            className="custom-control-label clickable"
                            htmlFor={"customPropType" + index}
                          >
                            {this.capitalizeText(ele.title)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5>
                      City:
                      <i className="fa fa-plus-square-o float-right" />
                    </h5>
                    <hr className="hr" />
                    <div className="optionsBlock">
                      {cityList.map((ele, index) => (
                        <div
                          key={"customCityName" + index}
                          className="custom-control custom-checkbox col"
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            value={ele._id}
                            onChange={event =>
                              this.manageCheckedValue(
                                ele._id,
                                "city",
                                event.currentTarget.checked
                              )
                            }
                            id={"customCityName" + index}
                          />
                          <label
                            className="custom-control-label clickable"
                            htmlFor={"customCityName" + index}
                          >
                            {this.capitalizeText(ele.name)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9 filteredPropertyBox">
              <div className="row">
                <div className="col-4">Showing {count} properties</div>
                <div className="col-4">
                  <h5 className="text-center">
                    Your properties will not list here
                  </h5>
                </div>
                <div className="col-4 text-right">
                  <button
                    type="button"
                    onClick={() => this.toggleBlockSize(12)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa fa-list" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => this.toggleBlockSize(6)}
                    className="btn btn-danger btn-sm ml-1"
                  >
                    <i className="fa fa-th-large" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <PropertyList
                // togglePageLoader={this.props.togglePageLoader}
                queryParams={queryParams}
                blockSize={blockSize}
                listingCount={count => this.setPropCount(count)}
                notUserId={true}
                {...this.props}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FindProperty;

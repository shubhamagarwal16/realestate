import React from "react";
import PropertyList from "../common/propertyList";

class UserDashboard extends React.Component {
  state = {
    queryParams: ""
  };

  componentDidMount() {
    this.setQueryParam();
  }

  componentDidUpdate() {
    if (!this.state.queryParams && this.props.user) this.setQueryParam();
  }

  setQueryParam = () => {
    const { user } = this.props;
    const queryParams = user && user._id ? `?userId=${user._id}` : "";
    this.setState({ queryParams });
  };

  render() {
    const { queryParams } = this.state;

    return (
      <React.Fragment>
        <div className="container mt-5 mb-5">
          <h4 className="text-danger">Your recent Postings:</h4>
          <hr className="hr" />

          <PropertyList queryParams={queryParams} {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}

export default UserDashboard;

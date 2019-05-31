import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import sold from "../../assets/images/sold.png";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <Carousel>
            <Carousel.Item>
              <img
                width="200px"
                className="d-block w-100"
                src={sold}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                width="200px"
                className="d-block w-100"
                src={sold}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                width="200px"
                className="d-block w-100"
                src={sold}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="container">
          <h4 className="text-danger">Recent Postings:</h4>
          <br className="br" />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

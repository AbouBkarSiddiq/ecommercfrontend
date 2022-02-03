import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class ClientSlider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    console.log("Next button clicked.")
    this.slider.slickNext();
  }
  previous() {
    console.log("Previous button clicked.")
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  return (
    <div id="carouselExample3Controls" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
      <Slider  ref={c => (this.slider = c)} {...settings}>
        <div className="carousel-item active">
          <div className="box col-lg-10 mx-auto">
            <div className="img_container">
              <div className="img-box">
                <div className="img_box-inner">
                  <img src="images/client.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="detail-box">
              <h5>
                Anna Trevor
              </h5>
              <h6>
                Customer
              </h6>
              <p>
                Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="box col-lg-10 mx-auto">
            <div className="img_container">
              <div className="img-box">
                <div className="img_box-inner">
                  <img src="images/client.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="detail-box">
              <h5>
                Anna Trevor
              </h5>
              <h6>
                Customer
              </h6>
              <p>
                Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="box col-lg-10 mx-auto">
            <div className="img_container">
              <div className="img-box">
                <div className="img_box-inner">
                  <img src="images/client.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="detail-box">
              <h5>
                Anna Trevor
              </h5>
              <h6>
                Customer
              </h6>
              <p>
                Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.
              </p>
            </div>
          </div>
        </div>
    </Slider>
      </div>
      <div className="carousel_btn_box">
        <a className="carousel-control-prev" href="#carouselExample3Controls" onClick={this.previous} role="button" data-slide="prev">
          <i className="fa fa-long-arrow-left" aria-hidden="true" />
          <span className="sr-only" >Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExample3Controls" onClick={this.next} role="button" data-slide="next">
          <i className="fa fa-long-arrow-right" aria-hidden="true"/>
          <span className="sr-only" >Next</span>
        </a>
      </div>

    </div>
  )
}
}
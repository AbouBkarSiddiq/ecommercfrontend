import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({ product }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <Slider {...settings} className="d-flex justify-content-center" >
        {product?.image?.map(item => (<div>
          <img src={item} alt="" className="d-flex justify-content-center" style={{ height: '300px', width: '300px' }} />
        </div>))
        }
      </Slider>
    </div>
  );
}
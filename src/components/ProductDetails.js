import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import io from 'socket.io-client'
import Messages from './Message';
import MessageInput from './MessageInput';
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../redux/actions/adminActions';
import SimpleSlider from './Carousel';
import { BallTriangle } from 'react-loader-spinner'


const ProductDetails = () => {
  const [singleItem, setSingleItem] = useState([])
  const [socket, setSocket] = useState(null);
  const [sizes, setSizes] = useState([{ size: 's', status: false },
  { size: 'm', status: false },
  { size: 'lg', status: false },
  { size: 'xl', status: false }
  ]);
  const { id } = useParams()
  const dispatch = useDispatch()
  // useEffect(() => {
  //     const newSocket = io(`https://ecommerceburraq.herokuapp.com/`);
  //     setSocket(newSocket);
  //     // cleanup function
  //     return () => newSocket.close();
  // }, [setSocket]);

  useEffect(() => {
    // getProductDataToUpdate(id)
    // dispatch(getSingleProduct(id))
    setSingleItem(product)
    console.log("get single product2::::")
  }, [])

  useEffect(() => {
    // getProductDataToUpdate(id)
    dispatch(getSingleProduct(id))
    setSingleItem(product)
    console.log("get single product::::")
  }, [])

  console.log("New socket:", socket)
  console.log("Id::::", id)

  let product = useSelector((state) => state.adminReducer.product);
  console.log('Data of single product:', product, typeof (product))
  const isFetching = useSelector((state) => state.adminReducer.isFetching)
  console.log('Products fetching true or false:::', isFetching)

  var settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2
  };

  // const sizes = ['s', 'm', 'l', 'xl']

  const handleSize = (e, index) => {
    // e.target.style.backgroundColor = '#d42a33'
    let arrayOfObject = [];
    sizes.map(item => {
      if (item.size === index.size) {
        arrayOfObject.push({
          size: item.size,
          status: true
        })
      } else {
        arrayOfObject.push({
          size: item.size,
          status: false
        })
      }
    })
    setSizes(arrayOfObject)
    console.log(e.target);
    console.log("Function Binded.", arrayOfObject, index, e)
  }

  return (
    <>
      {isFetching ? (<div className="d-flex justify-content-center align-items-center">
        <BallTriangle color="#d42a33" height={80} width={80} /></div>) : (
        <div className="d-flex flex-column" >
          {<div className="container" >
            <div className="card" style={{ backgroundColor: '' }}>
              <div className="container-fliud">
                <div className="wrapper row">
                  <div className="preview col-md-6">
                    <div className="preview-pic tab-content">
                      <SimpleSlider product={product} />
                    </div>
                  </div>
                  <div className="details col-md-6" >
                    <h3 className="product-title">{product.description}</h3>
                    <div className="rating">
                      <div className="stars">
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star" />
                        <span className="fa fa-star" />
                      </div>
                      <span className="review-no">41 reviews</span>
                    </div>
                    <p className="product-description">
                      Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia
                      sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus
                      posuere.
                    </p>
                    <h4 className="price">
                      current price: <span>${product.price}</span>
                    </h4>
                    <p className="vote">
                      <strong>91%</strong> of buyers enjoyed this product!{" "}
                      <strong>(87 votes)</strong>
                    </p>
                    <h5 id="sizes-btn" className="sizes">
                      sizes:{sizes.map((item) => (
                        <button style={{ marginLeft: '2px', marginRight: '2px' }} className={item.status ? 'btn-size-active' : 'btn-size'} data-toggle="tooltip" title="small" onClick={(e) => handleSize(e, item)}>
                          {item.size}
                        </button>
                      ))}
                    </h5>
                    <h5 className="colors">
                      colors:
                      <span
                        className="color orange not-available"
                        data-toggle="tooltip"
                        title="Not In store"
                      />
                      <span className="color green" />
                      <span className="color blue" />
                    </h5>
                    <div className="action">
                      <button className="add-to-cart btn btn-default" type="button" >
                        add to cart
                      </button>
                      <button className="like btn btn-default" type="button">
                        <span className="fa fa-heart" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
          <div className="py-4">
            <MessageInput socket={socket} />
          </div>

          {/* <Messages socket={socket}/> */}
        </div>
      )}

    </>
  );
}

export default ProductDetails;
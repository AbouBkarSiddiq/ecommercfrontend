import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";  
import { loadState, saveState } from '../../redux/actions/storageActions';

const ProductCard = ({ productItems, cartItems }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addToCart = (e, product) => {
    e.preventDefault()
    console.log('New product object', product)
    if (cartItems) {
      const found = cartItems.find(element => element._id === product._id);
      console.log("Id's matched:", found);

      if (found) {
        return alert("Item already exists.")
      } else {
        cartItems.push(product);
        dispatch(saveState([...cartItems]))
      }
    }
  }

  return ( 
    <>
    {productItems && productItems?.map((product, index) => (<div className="col-sm-6 col-md-4 col-lg-3 pb-4" key={index}>
    <div className="box">
      <div className="option_container">
        <div className="options">
          <Link to={`/product-details/${product._id}`} className="option1 btn-style" onClick={() => navigate('/product-details')} style={{ cursor: "pointer", textDecoration: "none" }}>
            Product Details
          </Link>
          {/* {
            cartItems.find(element => element._id === product._id) ? null : <button onClick={(e) => addToCart(e, product)} className="option2 btn-style" style={{ cursor: "pointer" }}>
              Add to Cart
            </button>
          } */}
        </div>
      </div>
      <div className="img-box">
        <img src={product.image[0]} alt="" />
      </div>
      <div className="detail-box">
        <h5>
          {product.title}
        </h5>
        <h6>
          {'$' + product.price}
        </h6>
      </div>
    </div>
  </div>
  ))
  }</>)
}

export default ProductCard
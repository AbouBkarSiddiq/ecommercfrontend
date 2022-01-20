import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { loadState, saveState } from '../redux/actions/storageActions';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe("pk_test_51KHkSsGpMGlAcNZe4RTGbHNAMaNFrGsQszQEUhRsobpuRLTZmW5v9RUC4mKifMvP06IOF8XDUJkDmfYQnFr0O0SI007LIYQlIJ");

const Cart = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };
  // console.log("Stripe Promise:", stripePromise);

  const [items, setItems] = useState([]);
  // const [itemPrice, setItemPrice] = useState(localStorage.getItem("priceOfItems"))
  let cartItems = useSelector((state) => state.storageReducer.cartItems);
  const dispatch = useDispatch()

  const handleDelete = (key) => {
    console.log("Id of item", key)
    console.log("Items array at handleDelete:", items)
    items.splice(key, 1);
    dispatch(saveState([...items]))
    setItems([...items])
  }

  useEffect(() => {
    dispatch(loadState())
    setItems(cartItems)
    // console.log("This hook works.")
  }, [])

  const itemsPrice = items.reduce(function (prev, current) {
    return prev + +current.price;
  }, 0)
  localStorage.setItem("priceOfItems", itemsPrice)

  return (
    <>
      <section className="product_section layout_padding">
        {items && items.length > 0 && items ? (<><div className="container">
          <div className="row">
            {items?.map((item, key) => (
              <div className="col-sm-6 col-md-4 col-lg-3" index={key}>
                <div className="box">
                  <div className="img-box">
                    <img src={item.image[0]} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>
                      {item.description}
                    </h5>
                    <h6>
                      {'$' + item.price}
                    </h6>
                  </div>
                  <button className="btn btn-danger" onClick={() => handleDelete(key)}>remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
            <div className="d-flex flex-column">
              <div className="d-flex my-2 justify-content-center align-items-center">
                <h2>Total Amount:</h2>
                <div>
                  <h2>
                    $ {itemsPrice}
                  </h2>
                </div>
              </div>
              <div>
                <Link to={'/payment'}>
                  <button className="btn btn-danger">Check Out</button>
                </Link>
              </div>
            </div>
            </>
        ) : <h3>You have not selected any item.</h3>}
      </section>
    </>
  )
}
export default Cart
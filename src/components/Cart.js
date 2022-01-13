import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { loadState, saveState } from '../redux/actions/storageActions';


const Cart = () => {
  const [items, setItems] = useState([]);
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
    console.log("This hook works.")
  }, [])

  return (
    <>
      <section className="product_section layout_padding">
        {items ? (<div className="container">
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
                      {item.price}
                    </h6>
                  </div>
                  <button className="btn btn-danger" onClick={() => handleDelete(key)}>remove</button>
                </div>
              </div>
            ))}
            <div className="d-flex my-2">
              <h2>Total Amount:</h2>
              <div>
                <h2>
                  {
                    items.reduce(function (prev, current) {
                      return prev + +current.price;
                    }, 0)
                  }
                </h2>
              </div>
            </div>
          </div>
        </div>
        ) : <h3>You have not selected any item.</h3>}

      </section>
    </>
  )
}
export default Cart
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { loadState, saveState } from '../../redux/actions/storageActions';
import { FaTrashAlt } from 'react-icons/fa';


const stripePromise = loadStripe("pk_test_51KHkSsGpMGlAcNZe4RTGbHNAMaNFrGsQszQEUhRsobpuRLTZmW5v9RUC4mKifMvP06IOF8XDUJkDmfYQnFr0O0SI007LIYQlIJ");

const Cart = () => {
  const options = {
    clientSecret: '{{CLIENT_SECRET}}',
  };
  const [items, setItems] = useState([]);
  let cartItems = useSelector((state) => state.storageReducer.cartItems);
  console.log("Cart Items:::", cartItems)
  const dispatch = useDispatch()

  const handleDelete = (key) => {
    console.log("Id of item", key)
    console.log("Items array at handleDelete:", items)
    items.splice(key, 1);
    dispatch(saveState([...items]))
    setItems([...items])
  }

  useEffect(() => {
    setItems(cartItems)
  }, [cartItems])

  useEffect(() => {
    dispatch(loadState())
  }, [])

  const increaseQty = (item) => {
    console.log("Qty should increased", item._id)
    const index = items.findIndex(ele => ele.id === item._id)
    console.log("Index.....", index)
    if (item.qty < 10) {
      items[index] = ++item.qty
      console.log("Item array for qty::", items)
      dispatch(saveState([...items]))
    }
  }

  const decreaseQty = (item) => {
    console.log("Qty should decreased", item)
    const index = items.findIndex(ele => ele.id === item._id)
    console.log("Index.....", index)
    if (item.qty > 1) {
      items[index] = --item.qty
      console.log("Item array for qty::", items)
      dispatch(saveState([...items]))
    }
  }

  const itemsPrice = items.reduce(function (prev, current) {
    return prev + +current.price * current.qty;
  }, 0)

  localStorage.setItem("priceOfItems", itemsPrice)

  return (
    <>{items && (<section className="product_section">
      <div className="p-4 border mx-4" style={{ backgroundColor: 'white',  paddingLeft: '100px' }}>
        <label className="pl-2 mt-4 font-weight-bold">Shopping Bag</label>
        <table class="table">
          <thead>
            <tr scope="row">
              <th scope="col">Item</th>
              <th scope="col">Size</th>
              <th scope="col">color</th>
              <th scope="col">units</th>
              <th scope="col">price</th>
              <th scope="col">remove</th>
            </tr>
          </thead>
          {
            items?.map((item, key) => (
              <tbody>
                <tr scope="row">
                  <td><img src={item.image[0]} alt="" style={{ width: '100px', height: '100px' }} /></td>
                  <td>{item.sizeSelected}</td>
                  <td>{item.colorSelected}</td>
                  <td className="">
                    <div className="d-flex justify-content-between align-items-center px-2 border w-50 py-1">
                      <div style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => decreaseQty(item)}> - </div>
                      {item.qty}
                      <div style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => increaseQty(item)}> + </div>
                    </div>
                  </td>
                  <td>{'$' + item.price * item.qty}</td>
                  <td>
                    <div className="btn" style={{ cursor: "pointer" }} onClick={() => handleDelete(key)}><FaTrashAlt /></div>
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex my-2 justify-content-center align-items-center">
          <h2>Total Amount: </h2>
          <div>
            <h2>
              ${itemsPrice}
            </h2>
          </div>
        </div>               <div className="d-flex justify-content-center align-items-center">
          <Link to={'/payment'} >
            <button className="btn btn-danger">Check Out</button>
          </Link>
        </div>
      </div>
    </section>
    )}
    </>
  )
}
export default Cart



















// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, Link } from 'react-router-dom';
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// // import CheckoutForm from './CheckoutForm';
// import { loadState, saveState } from '../../redux/actions/storageActions';
// import PaymentForm from '../../components/common/PaymentForm';

// const stripePromise = loadStripe("pk_test_51KHkSsGpMGlAcNZe4RTGbHNAMaNFrGsQszQEUhRsobpuRLTZmW5v9RUC4mKifMvP06IOF8XDUJkDmfYQnFr0O0SI007LIYQlIJ");

// const Cart = () => {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: '{{CLIENT_SECRET}}',
//   };
//   // console.log("Stripe Promise:", stripePromise);

//   const [items, setItems] = useState([]);
//   // const [itemPrice, setItemPrice] = useState(localStorage.getItem("priceOfItems"))
//   let cartItems = useSelector((state) => state.storageReducer.cartItems);
//   console.log("Cart Items:::", cartItems)
//   const dispatch = useDispatch()

//   const handleDelete = (key) => {
//     console.log("Id of item", key)
//     console.log("Items array at handleDelete:", items)
//     items.splice(key, 1);
//     dispatch(saveState([...items]))
//     setItems([...items])
//   }

//   useEffect(() => {
//     dispatch(loadState())
//     setItems(cartItems)
//     // console.log("This hook works.")
//   }, [])

//   // const itemsPrice = items.reduce(function (prev, current) {
//   //   return prev + +current.price;
//   // }, 0)

//   // localStorage.setItem("priceOfItems", itemsPrice)

//   return (
//     <>
//       <section className="product_section">
//         {items && items.length > 0 && items ? (<><div className="container">
//           <div className="row">
//             {items?.map((item, key) => (
//               <div className="col-sm-6 col-md-4 col-lg-3" index={key}>
//                 <div className="box">
//                   <div className="img-box">
//                     <img src={item.image[0]} alt="" />
//                   </div>
//                   <div className="detail-box">
//                     <h5>
//                       {item.description}
//                     </h5>
//                     <h6>
//                       {'$' + item.price}
//                     </h6>
//                   </div>
//                   <div className="detail-box">
//                     <h5>
//                       Size: {item.sizeSelected}
//                     </h5>
//                     <h6>
//                       Qty:{item.qty}
//                     </h6>
//                   </div>
//                   <div className="detail-box">
//                     <h5>
//                       Price: {item.price * item.qty}
//                     </h5>
//                   </div>
//                   <button className="btn btn-danger" onClick={() => handleDelete(key)}>remove</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//             <div className="d-flex flex-column">
//               <div className="d-flex my-2 justify-content-center align-items-center">
//                 {/* <h2>Total Amount:</h2>
//                 <div>
//                   <h2>
//                     $ {itemsPrice}
//                   </h2>
//                 </div> */}
//               </div>
//               <div className="d-flex justify-content-center align-items-center">
//                 <Link to={'/payment'} >
//                   <button className="btn btn-danger" >Check Out</button>
//                 </Link>
//               </div>
//             </div>
//             </>
//         ) : <h3 className="d-flex justify-content-center align-items-center">You have not selected any item.</h3>}
//       </section>
//     </>
//   )
// }
// export default Cart
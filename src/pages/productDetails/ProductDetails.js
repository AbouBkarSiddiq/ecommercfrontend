import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../../redux/actions/adminActions';
import { loadState, saveState } from '../../redux/actions/storageActions';
import SimpleSlider from '../../components/product/Carousel';
import MessageInput from "../../components/common/MessageInput";
import { BallTriangle } from 'react-loader-spinner'
import 'bootstrap/dist/css/bootstrap.css';

const ProductDetails = () => {
  const [singleItem, setSingleItem] = useState([])
  const [socket, setSocket] = useState(null);
  let cartItems = useSelector((state) => state.storageReducer.cartItems);
  // useEffect(() => {
  //   const newSocket = io(`https://ecommerceburraq.herokuapp.com/`);
  //   setSocket(newSocket);
  //   // cleanup function
  //   return () => newSocket.close();
  // }, [setSocket]);

  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    setSingleItem(product)
  }, [])

  useEffect(() => {
    dispatch(getSingleProduct(id))
    // setSingleItem(product)
    dispatch(loadState())
    console.log("get single product::::")
  }, [])

  let product = useSelector((state) => state.adminReducer.product);
  const isFetching = useSelector((state) => state.adminReducer.isFetching)

  const handleSize = (e, item, product) => {
    console.log("item", item)
    product['sizeSelected'] = item
  }

  const handleColorChange = (e, item, product) => {
    product['colorSelected'] = item
    // console.log("Event of color:", e)
    // console.log("Color Hexcode:", item)
  }

  const addToCart = (e, product) => {
    e.preventDefault()
    console.log("Product at add to Cart:", product)
    if (cartItems) {
      const found = cartItems.find(element => ((element._id === product._id) && (element.sizeSelected === product.sizeSelected) && (element.colorSelected === product.colorSelected)));
      if (found) {
        console.log("Qty should increase only because same size already exists.", found)
        const newObj = { ...found }
        newObj.qty = ++newObj.qty;
        console.log("new object.", newObj)
        const newObject = { ...product, ...newObj }
        console.log("new object:::::", newObject)
        // console.log("localItems::::", cartItems)
        const newArray = cartItems.filter(element => {
          // console.log("Size of product and element::", element.sizeSelected, product.sizeSelected)
          // console.log("Size of product and element::", element.colorSelected, product.colorSelected)
          // console.log("Size of product and element::", element._id, product._id)
          return !((element._id === product._id) && (element.sizeSelected === product.sizeSelected) && (element.colorSelected === product.colorSelected))
        })

        // console.log("New array::::", newArray)
        console.log("New array::::", newArray)
        newArray.push(newObj)
        dispatch(saveState([...newArray]))

        // let newArray = []
        // newArray = localItems.map((item) => (item._id === product._id ? { ...item, ...product } : item))

      } else {
        product['qty'] = 1
        cartItems.push(product)
        dispatch(saveState([...cartItems]))
        console.log("Qty should updated along with size as the item is added for the first time.")
      }
    }
  }

  return (
    <>
      {isFetching ? (<div className="d-flex justify-content-center align-items-center">
        <BallTriangle color="#d42a33" height={80} width={80} /></div>) : (product &&
          <div className="d-flex flex-column">
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
                      <h3 className="product-title">{product.title}</h3>
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
                      <p>{product.description}</p>
                      {/* <p className="product-description">
                        Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia
                        sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus
                        posuere.
                      </p> */}
                      <h4 className="price">
                        current price: <span>${product.price}</span>
                      </h4>
                      {/* <p className="vote">
                        <strong>91%</strong> of buyers enjoyed this product!{" "}
                        <strong>(87 votes)</strong>
                      </p> */}
                      <h5 id="sizes-btn" className="sizes">
                        sizes:{product ? product?.size?.map((item) => (
                          <button style={{ marginLeft: '2px', marginRight: '2px', }} onClick={(e) => handleSize(e, item, product)}>
                            {item}
                          </button>
                        )) : null}
                      </h5>

                      <h5 id="sizes-btn" className="sizes">
                        colors:{product ? product?.color?.map((item) => (
                          <button style={{ marginLeft: '2px', marginRight: '2px', height: '30px', width: '30px', backgroundColor: `${item}` }} onClick={(e) => handleColorChange(e, item, product)} />
                        )) : null}
                      </h5>
                      <div className="">
                        <button className="btn" style={{backgroundColor: '#f7444e', color: 'white'}} type="button" onClick={(e) => addToCart(e, product)} >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            }
            <div className="py-4">
              <MessageInput socket={socket} id={id}/>
            </div>
          </div>
      )}
    </>
  );
}

export default ProductDetails;










// import axios from 'axios'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import Slider from "react-slick";
// import io from 'socket.io-client'
// import Messages from './Message';
// import MessageInput from './MessageInput';
// import { useParams } from 'react-router-dom'
// import { getSingleProduct } from '../redux/actions/adminActions';
// import { loadState, saveState } from '../redux/actions/storageActions';
// import SimpleSlider from './Carousel';
// import { BallTriangle } from 'react-loader-spinner'
// import { setLocale } from 'yup';

// const ProductDetails = () => {
//   const [singleItem, setSingleItem] = useState([])
//   const [socket, setSocket] = useState(null);

//   let cartItems = useSelector((state) => state.storageReducer.cartItems);
//   // console.log("CartItems at product page:", cartItems)

//   const { id } = useParams()
//   const dispatch = useDispatch()
  // useEffect(() => {
  //     const newSocket = io(`https://ecommerceburraq.herokuapp.com/`);
  //     setSocket(newSocket);
  //     // cleanup function
  //     return () => newSocket.close();
  // }, [setSocket]);

//   useEffect(() => {
//     // getProductDataToUpdate(id)
//     // dispatch(getSingleProduct(id))
//     setSingleItem(product)
//   }, [])

//   useEffect(() => {
//     // getProductDataToUpdate(id)
//     dispatch(getSingleProduct(id))
//     setSingleItem(product)
//     dispatch(loadState())
//     console.log("get single product::::")
//   }, [])


//   let product = useSelector((state) => state.adminReducer.product);
//   // console.log('Data of single product:', product, typeof (product))
//   const isFetching = useSelector((state) => state.adminReducer.isFetching)
//   // console.log('Products fetching true or false:::', isFetching)

//   const sizes = ['s', 'm', 'l', 'xl']
//   let qty = 0

//   const handleSize = (e, item, product) => {
//     localStorage.setItem('size', item)
//     product['size'] = item
//     product['qty'] = 1
//     // console.log(typeof(qty))
//   }

//   const addToCart = (e, product) => {
//     e.preventDefault()
//     const localItems = [...cartItems]

//     if (cartItems) {
//       const found = cartItems.find(element => (
//         // console.log("element size>>>", element.size, product.size)
//         // console.log("element size>>>", element._id, product._id)
//         (element._id === product._id) && (element.size === product.size)
//       ));

//       if (found) {
//         console.log("Qty should increase only because same size already exists.", found)
//         const newObj = {...found}
//         newObj.qty = ++newObj.qty;
//         console.log("new object.", newObj)
//         console.log("localItems::::", cartItems)

//         // let newArray = localItems.filter(ele => (ele.size === newObj.size))
//         cartItems.push(newObj)
//         dispatch(saveState([...cartItems]))

//         // let newArray = []
//         // newArray = localItems.map((item) => (item._id === product._id ? { ...item, ...product } : item))

//         // cartItems.push(newObj)
//         // dispatch(saveState([...cartItems]))

//         // console.log("Qty increased::", newObj.qty)
//         // let newProduct = {...found, ...newObj.qty}
//         // console.log("New product:::", newProduct)

//         // product['qty'] = ++qty
//         // localStorage.setItem('qty', qty)
//         // localStorage.setItem('qty', found['qty'] = ++qty)


//         // console.log("This should work.")
//         // console.log("New array::::", newArray)
//         // dispatch(saveState([...newArray]))

//       } else {
//         cartItems.push(product)
//         dispatch(saveState([...cartItems]))
//         console.log("Qty should updated along with size as the item is added for the first time.")
//       }
//     }

//     // if (cartItems) {
//     // const found = cartItems.find(element => element._id === product._id);
//     //   console.log("Id's matched:", found);

//     //   if (found) {
//     //     return console.log("Item already exists.")
//     //   } else {
//     //     cartItems.push(product);
//     //     dispatch(saveState([...cartItems]))
//     //   }
//     // }
//   }

//   // const handleSize = (e, index) => {
//   //   let arrayOfObject = [];
//   //   sizes.map(item => {
//   //     if (item.size === index.size) {
//   //       arrayOfObject.push({
//   //         size: item.size,
//   //         status: true
//   //       })
//   //     } else {
//   //       arrayOfObject.push({
//   //         size: item.size,
//   //         status: false
//   //       })
//   //     }
//   //   })
//   //   setSizes(arrayOfObject)
//   //   console.log(e.target);
//   //   console.log("Function Binded.", arrayOfObject, index, e)
//   // }

//   return (
//     <>
//       {isFetching ? (<div className="d-flex justify-content-center align-items-center">
//         <BallTriangle color="#d42a33" height={80} width={80} /></div>) : (
//         <div className="d-flex flex-column" >
//           {<div className="container" >
//             <div className="card" style={{ backgroundColor: '' }}>
//               <div className="container-fliud">
//                 <div className="wrapper row">
//                   <div className="preview col-md-6">
//                     <div className="preview-pic tab-content">
//                       <SimpleSlider product={product} />
//                     </div>
//                   </div>
//                   <div className="details col-md-6" >
//                     <h3 className="product-title">{product.description}</h3>
//                     <div className="rating">
//                       <div className="stars">
//                         <span className="fa fa-star checked" />
//                         <span className="fa fa-star checked" />
//                         <span className="fa fa-star checked" />
//                         <span className="fa fa-star" />
//                         <span className="fa fa-star" />
//                       </div>
//                       <span className="review-no">41 reviews</span>
//                     </div>
//                     <p className="product-description">
//                       Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia
//                       sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus
//                       posuere.
//                     </p>
//                     <h4 className="price">
//                       current price: <span>${product.price}</span>
//                     </h4>
//                     <p className="vote">
//                       <strong>91%</strong> of buyers enjoyed this product!{" "}
//                       <strong>(87 votes)</strong>
//                     </p>
//                     <h5 id="sizes-btn" className="sizes">
//                       sizes:{sizes.map((item) => (
//                         <button style={{ marginLeft: '2px', marginRight: '2px', }} onClick={(e) => handleSize(e, item, product)}>
//                           {item}
//                         </button>
//                       ))}
//                     </h5>
//                     <h5 className="colors">
//                       colors:
//                       <span
//                         className="color orange not-available"
//                         data-toggle="tooltip"
//                         title="Not In store"
//                       />
//                       <span className="color green" />
//                       <span className="color blue" />
//                     </h5>
//                     <div className="action">
//                       <button className="add-to-cart btn btn-default" type="button" onClick={(e) => addToCart(e, product)}>
//                         add to cart
//                       </button>
//                       {/* <button className="like btn btn-default" type="button">
//                         <span className="fa fa-heart" />
//                       </button> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           }
//           <div className="py-4">
//             <MessageInput socket={socket} />
//           </div>
//           {/* <Messages socket={socket}/> */}
//         </div>
//       )}

//     </>
//   );
// }

// export default ProductDetails;
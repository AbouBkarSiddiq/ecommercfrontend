import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client'
import Messages from './Message';
import MessageInput from './MessageInput';
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../redux/actions/adminActions';
import { getProductDataToUpdate } from '../redux/actions/adminActions';

const ProductDetails = () => {
  const [singleItem, setSingleItem] = useState([])
  const [socket, setSocket] = useState(null);
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

  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <div>
          <img src={product.image[0]} alt='' />
        </div>

        <div>Details</div>
      </div>
      <MessageInput socket={socket} />
      {/* <Messages socket={socket}/> */}
    </div>
  );
}

export default ProductDetails;
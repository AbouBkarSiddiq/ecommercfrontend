import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Redirect, Link } from 'react-router-dom';
import { getAllProducts } from '../redux/actions/adminActions'

const Product = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let products = useSelector((state) => state.adminReducer.products);
    const isFetching = useSelector((state) => state.adminReducer.isFetching)
    const [items, setItems] = useState([])

    useEffect(() => {
        dispatch(getAllProducts());
        console.log('Rendering useEffect...')
    }, [])
    console.log('Data of fetched products:', products)

    const addToCart = (product, product_id) => {
        console.log('Product', product._id)
        console.log('Product id', product_id)
        // if(product._id !== product_id) {
        items.push(product);
        localStorage.setItem("item", JSON.stringify(items));
        console.log('Key of the product.', product)
        console.log('Add to Cart function.')
        // }
    }

    return (
        <>
            <section className="product_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Our <span>products</span>
                        </h2>
                    </div>
                    <div className="row">
                        {products?.map((product, key) => (
                            // localStorage.setItem(key 'item')
                            <div className="col-sm-6 col-md-4 col-lg-3" index={key}>
                                <div className="box">
                                    <div className="option_container">
                                        <div className="options">
                                            <Link to={`product-details/${product._id}`}>
                                                <h2 onClick={() => navigate('/product-details')} className="option1" style={{ cursor: "pointer" }} >
                                                    Product Details
                                                    {/* {product.title} */}
                                                </h2>
                                            </Link>
                                            <h2 onClick={() => addToCart(product, product._id)} className="option2" style={{ cursor: "pointer" }}>
                                                Buy Now
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="img-box">
                                        <img src={product.image[0]} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>
                                            {product.description}
                                        </h5>
                                        <h6>
                                            {product.price}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="btn-box">
                        <a>
                            View All products
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Product
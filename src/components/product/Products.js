import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Redirect, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getAllProducts } from '../../redux/actions/adminActions'
import { loadState, saveState } from '../../redux/actions/storageActions';
import ProductCard from '../product/productCard';
import Footer from '../common/Footer';
import { BallTriangle } from 'react-loader-spinner'

const Product = () => {
  const dispatch = useDispatch()
  const [productItems, setProductItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productItemsPerPage] = useState(4)

  let products = useSelector((state) => state.adminReducer.products);
  // console.log('Data of fetched products:', products)
  const isFetching = useSelector((state) => state.adminReducer.isFetching)
  // console.log('Products fetching true or false:::', isFetching)

  let cartItems = useSelector((state) => state.storageReducer.cartItems);
  // console.log("CartItems at product page:", cartItems)

  const [items, setItems] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 4
  const pagesVisited = pageNumber * itemsPerPage
  const displayItems = items.slice(pagesVisited, pagesVisited + itemsPerPage)

  useEffect(() => {
    dispatch(getAllProducts());
    setProductItems(products)
    setItems(products)
    dispatch(loadState())
  }, [])

  const pageCount = Math.ceil(items.length / itemsPerPage)
  const changeItem = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <>
    {isFetching ?  (<div className="d-flex justify-content-center align-items-center">
        <BallTriangle color="#d42a33" height={80} width={80} /></div>) : <>
      <section className="product_section py-2">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              Our <span>products</span>
            </h2>
          </div>
          <div className="row">
            {
              <>
                <ProductCard productItems={displayItems} cartItems={cartItems} />
                <div style={{ display: 'flex', flexDirection: '', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changeItem}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                </div>
              </>
            }
          </div>
        </div>
      </section>
      <Footer />
    </>}
    </>
  )
}
export default Product
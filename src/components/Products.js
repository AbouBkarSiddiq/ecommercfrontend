import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Redirect, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getAllProducts } from '../redux/actions/adminActions'
import { loadState, saveState } from '../redux/actions/storageActions';
import ProductCard from './productCard';
import Pagination from './Pagination'
import HeaderGrid from './HeaderGrid';
import ProductFooter from './ProductFooter';
import { BallTriangle } from 'react-loader-spinner'

const Product = () => {
  const dispatch = useDispatch()
  const [productItems, setProductItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productItemsPerPage] = useState(4)

  let products = useSelector((state) => state.adminReducer.products);
  console.log('Data of fetched products:', products)
  const isFetching = useSelector((state) => state.adminReducer.isFetching)
  console.log('Products fetching true or false:::', isFetching)

  let cartItems = useSelector((state) => state.storageReducer.cartItems);
  console.log("CartItems at product page:", cartItems)

  const [users, setUsers] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const usersPerPage = 4
  const pagesVisited = pageNumber * usersPerPage
  const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage)

  useEffect(() => {
    dispatch(getAllProducts());
    setProductItems(products)
    setUsers(products)
    dispatch(loadState())
    console.log('Rendering useEffect...')
  }, [])

  const indexOfLastPost = currentPage * productItemsPerPage
  const indexOfFirstPost = indexOfLastPost - productItemsPerPage
  const currentPosts = productItems.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const pageCount = Math.ceil(users.length / usersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <>
    {isFetching ?  (<div className="d-flex justify-content-center align-items-center">
        <BallTriangle color="#d42a33" height={80} width={80} /></div>) : <>
      <HeaderGrid name="Product Grid"/>
      <section className="product_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              Our <span>products</span>
            </h2>
          </div>
          <div className="row">
            {
              <>
                <ProductCard productItems={displayUsers} cartItems={cartItems} />
                <div style={{ display: 'flex', flexDirection: '', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                </div>
                {/* <ProductCard productItems={currentPosts} cartItems={cartItems} /> */}
                {/* <Pagination productItemsPerPage={productItemsPerPage} totalProductItems={productItems.length} paginate={paginate}/> */}
              </>
            }

          </div>
        </div>
      </section>
      <ProductFooter />
    </>}
    </>
  )
}
export default Product
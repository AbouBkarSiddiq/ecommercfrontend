import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from '../redux/actions/adminActions'
import HeaderGrid from './HeaderGrid';

const Categories = () => {
  const dispatch = useDispatch()
  // const [product, setProduct] = useState([])
  let categories = useSelector((state) => state.adminReducer.categories);
  const isFetching = useSelector((state) => state.adminReducer.isFetching)

  useEffect(() => {
    dispatch(getAllCategories());
    console.log('Rendering useEffect...')
  }, [])
  
  console.log('Data of fetched categories:', categories)
  return (
    <div>
      <HeaderGrid name="Category Grid" />
      <section className="why_section p-4">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              Our Categories
            </h2>
          </div>
          <div className="row">
            {categories.map((category, key) => (
              <div className="col-md-4" index={key}>
                <div className="box">
                  <div style={{ width: '250px', height: '250px', position: 'relative' }}>
                    <img src={category.image} alt="" style={{ width: '250px', height: '250px' }} />
                  </div>
                  <div className="detail-box" >
                    <h5>
                      {category.title}
                    </h5>
                    <p>
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default Categories
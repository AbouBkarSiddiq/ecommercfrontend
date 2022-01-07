import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from '../redux/actions/adminActions'

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
      <section className="why_section layout_padding">
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
                {/* <div className="d-flex my-2" style={{position: 'relative'}}>
                                        <img src={category.image} alt=""  style={{width: '250px', height: '250px'}}/>
                                    <div className="d-flex flex-column align-items-center justify-content-center" style={{position: 'absolute', top: '70%'}}>
                                        <h5 className="">
                                            {category.title}
                                        </h5>
                                        <h5 className="">
                                            {category.description}
                                        </h5>
                                    </div>
                                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Categories

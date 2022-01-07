import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  userName: '',
  text: '',
  productId: ''
}

const onSubmit = values => {
  console.log('Fomik values:', values)
}

const validate = values => {
  let errors = {}
  if (!values.userName) {
    errors.userName = 'Required'
  }

  if (!values.text) {
    errors.text = 'Required'
  }

  if (!values.productId) {
    errors.productId = 'Required'
  }

  return errors
}

const validationSchema = Yup.object({
  userName: Yup.string().required('Required!'),
  text: Yup.string().required('Required!'),
  productId: Yup.string().required('Required!'),
})

const OldMessageInput = ({ socket }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validationSchema,
    validate
  })

  console.log("Formik errors:", formik.errors)
  const navigate = useNavigate()
  // const [userName, setUserName] = useState()
  // const [text, setText] = useState()
  // const [productId, setProductId] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = JSON.stringify({ userName, text, productId });

    // console.log("Data of input fields:", data)
    // socket.emit('message', data);
    // socket.emit("comment", data);
    // socket.emit('message', userName);
    // setText('');
    // setUserName('')
    // setProductId('')
    // console.log('Comment related data:', data)
  }

  // useEffect(() => {
  //   socket.on("comment", async (data) => {
  //     const data1 = await data ;
  //     console.log('jjjg', data1);
  //   });
  // })
  
  
  console.log('Formik visited:', formik.touched)
  return (
    <>
      <section class="why_section layout_padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3">
              <div class="full">
                <form onSubmit={formik.handleSubmit}>
                  <fieldset>
                    <input
                      type="text"
                      placeholder="Comment"
                      name="text"
                      value={formik.values.text}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.text && formik.errors.text ? <div style={{color: 'red'}}>{formik.errors.text}</div> : null}
                    <input
                      type="text"
                      placeholder="Enter your name"
                      name="userName"
                      value={formik.values.userName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.userName && formik.errors.userName ? <div style={{color: 'red'}}>{formik.errors.userName}</div> : null}
                    <input
                      type="text"
                      placeholder="Product Id"
                      name="productId"
                      value={formik.values.productId}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.productId && formik.errors.productId ? <div style={{color: 'red'}}>{formik.errors.productId}</div> : null}
                  </fieldset>
                    <button type="submit" className="btn btn-primary my-4">Send Message</button>
                </form>
              </div>
              <div className="">
                {/* Already have an account? */}
                <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} className="" >
                  {/* Login */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OldMessageInput

import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

const validationSchema = Yup.object({
  userName: Yup.string().required('Required!'),
  text: Yup.string().required('Required!'),
  productId: Yup.string().required('Required!'),
})
 
const MessageInput = ({ socket }) => {
  const navigate = useNavigate()
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

  return (
    <>
      <section class="why_section layout_padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} class="full">
                <Form>
                  <fieldset>
                    <div className="d-flex flex-column">
                      <label style={{ textAlign: 'left' }}>Message</label>
                      <Field
                        style={{marginBottom: '8px !important', backgroundColor: 'red'}}
                        type="text"
                        placeholder="Comment"
                        name="text"
                      />
                      <div className="text-left text-danger" style={{marginBottom: '8px !important'}} >
                        <ErrorMessage name='text' />
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <label style={{ textAlign: 'left' }}>User Name</label>
                      <Field
                        type="text"
                        placeholder="Enter your name"
                        name="userName"
                      />
                      <div className="text-left text-danger" >
                        <ErrorMessage name='userName' />
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <label style={{ textAlign: 'left' }}>ProductId</label>
                      <Field
                        type="text"
                        placeholder="Product Id"
                        name="productId"
                      />
                      <div className="text-left text-danger mb-4" >
                        <ErrorMessage name='productId' />
                      </div>
                    </div>
                  </fieldset>
                  <button type="submit" className="btn btn-primary my-4">Send Message</button>
                </Form>
              </Formik>
              <div className="">
                <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} className="" >
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MessageInput
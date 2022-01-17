import { useState, useEffect } from 'react'
import { useNavigate, Redirect } from 'react-router-dom';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
// import { login } from '../../redux/actions/authActions'

const initialValues = {
  email: '',
  password: ''
}

const onSubmit = values => {
  console.log('Fomik values:', values)
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  password: Yup.string().required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')

})

const validate = values => {
  let errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  let userId = localStorage.getItem('userId')
  useEffect(() => {
    if (userId) {
      // history.push('/home')
    }
  })

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const data = { email, password }
  //     console.log("Data of user:", data)
  // }

  return (
    <>
      <section class="py-4">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3 border py-4 px-4">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} class="full">
                <Form>
                  <fieldset>
                    <div className="d-flex flex-column">
                      <label style={{ textAlign: 'left' }}>Email</label>
                      <Field
                        type="email"
                        placeholder="Enter your email address"
                        name="email"
                      />
                      <div className="text-left text-danger" >
                        <ErrorMessage name='email' />
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <label style={{ textAlign: 'left' }}>Password</label>
                      <Field
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                      />
                      <div className="text-left text-danger" >
                        <ErrorMessage name='password' />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Login</button>
                  </fieldset>
                </Form>
              </Formik>
              <div className="">
                Didn't have account?
                <span onClick={() => navigate('/register')} style={{ cursor: 'pointer' }} className="" >
                  Sign up
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
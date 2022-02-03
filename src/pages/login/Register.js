import { useState } from 'react'
import { Form, Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  userName: '',
  email: '',
  password: '',
  address: ''
}

const onSubmit = values => {
  console.log('Fomik values:', values)
}

const validationSchema = Yup.object({
  userName: Yup.string().required('Required!'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  password: Yup.string().required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  address: Yup.string().required('Required!'),

})

const Register = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data =  { userName, email, password, address }
    // console.log('Data coming at register page:', data)

    // axios.post('http://192.168.100.44:3000/user/register', data)
    // .then((response) => {
    //     alert('Data sent successfully.', response)
    //     console.log('User registration successful')
    //     setIsLoading(false)
    //     history.push('/')
    // })
  }
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
                      <label style={{ textAlign: 'left' }}>Name</label>
                      <Field
                        type="text"
                        placeholder="Enter Name"
                        name="userName"
                        // style={{backgroundColor: 'red'}}
                      />
                      <div className="text-left text-danger" >
                        <ErrorMessage name='userName' />
                      </div>
                    </div>
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
                    <div className="d-flex flex-column">
                      <label style={{ textAlign: 'left' }}>Address</label>
                      <Field
                        type="text"
                        placeholder="Enter your address"
                        name="address"
                      />
                      <div className="text-left text-danger" >
                        <ErrorMessage name='address' />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary my-2">Sign Up</button>
                  </fieldset>
                </Form>
              </Formik>
              <div className="">
                Already have an account?
                <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} className="" >
                  Login
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Register;
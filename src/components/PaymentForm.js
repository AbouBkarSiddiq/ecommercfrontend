import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Form, Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { object, string, number, date, InferType } from 'yup';
import { createToken } from "../redux/actions/adminActions"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

const initialValues = {
  number: '',
  exp_month: '',
  exp_year: '',
  cvc: ''
}

const onSubmit = values => {
  console.log('Fomik values:', values)
}

const validationSchema = Yup.object({
  number: string().required('Required')
    .min(13, 'Minimum card number length must be 13 digits.')
    .max(17, 'Maximum card number length must be 17')
    .matches(/^[0-9]+$/, "Must be only digits"),

  exp_month: string().required('Required')
    .matches(/^[0-9]+$/, "Must be only positive number.")
    .min(1, 'Minimum month number start from 1.')
    .max(2, 'Maximum month number must be 12'),

  exp_year: number().required('Required')
    .test('len', 'Must be exactly 4 characters',
      val => val && val.toString().length === 4).min(new Date().getFullYear()),

  // exp_year: string().required('Expire date of card is required.')
  //   .matches(/^[0-9]+$/, "Must be only positive number.")
  //   .min(4, 'Minimum year number must be 4 digits.')
  //   .max(4, 'Maximum year number must be 4 digits'),

  cvc: string().required('No cvc provided.')
    .matches(/^[0-9]+$/, "Must be only positive digits."),
  // .min(3, 'Cvc must be 3 digits minimum.')
  // .max(4, 'Cvc must be 4 digits maximum'),
})

const PaymentForm = () => {
  const [value, setValue] = useState('')
  const [lengthValue, setLengthValue] = useState('')
  const dispatch = useDispatch();
  const elements = useElements()
  const stripe = useStripe()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const data = { number, exp_month, exp_year, cvc }
    // console.log('Data of card info:', data)
    // dispatch(createToken(data))

    // axios.post('http://localhost:3002/stripe/create-token', data)
    // .then(response => {
    //     console.log("Response coming from creating new todo.", response)
    // })

    // if (!stripe || !elements) {
    //     return
    // }

    // const { clientSecret } = await fetch('http://localhost:3002/stripe/create-token', {
    //     method: 'POST',
    //     headers: {
    //         contentType: 'application/json',
    //     },
    //     body: JSON.stringify({
    //         paymentMethodType: 'card',
    //         currency: 'USD',
    //     }),
    // }).then(response => response.json())

    // const { paymentIntent } = await stripe.confirmCardPayment(
    //     clientSecret,
    //     {
    //         payment_method: {
    //             card: elements.getElement(CardElement)
    //         }
    //     }
    // )
    // console.log(paymentIntent.id)
  }

  const MyInput = ({ field, form, handleBlur, handleChange, ...rest }) =>
    <div>
      <Field
        {...field}
        onBlur={handleBlur}
        {...rest}

      />
    </div>

  return (
    <div>
      <h1>Card Details</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} class="full">
        <Form>
          <fieldset className="" style={{ paddingLeft: '500px', paddingRight: '500px' }}>
            <div className="d-flex flex-column">
              <label className="d-flex">Card Number</label>
              <Field
                type="number"
                name="number"
                placeholder="XXXXXXXXXXXXXX"
                onKeyUp={(e) => {
                  let someValue = e.target.value
                  var result = someValue.match(/.{1,2}/g)
                  setValue(result[0])
                  console.log("Value::::::::::", result[0])
                }}
              />
              <div className="text-left text-danger" >
                <ErrorMessage name='number' />
              </div>
            </div>
            <div className="d-flex flex-column">
              <label className="d-flex">Exp Month</label>
              <Field
                type="number"
                name="exp_month"
                placeholder="MM"
              />
              <div className="text-left text-danger" >
                <ErrorMessage name='exp_month' />
              </div>
            </div>
            <div className="d-flex flex-column">
              <label className="d-flex">Exp Year</label>
              <Field
                type="number"
                name="exp_year"
                placeholder="YYYY"
              />
              <div className="text-left text-danger" >
                <ErrorMessage name='exp_year' />
              </div>
            </div>
            <div className="d-flex flex-column">
              <label className="d-flex">CVC</label>
              <Field
                type="number"
                name="cvc"
                placeholder="XXXX"
                onKeyUp={(e) => {
                  let someValue = e.target.value
                  setLengthValue(someValue)
                  console.log("Some value:", lengthValue.length)
                }}
                onClick={(e) => {
                  let value = e.target.value
                  setLengthValue(value.length)
                  console.log('This function works:', lengthValue.length)
                }}
              />
              {(value !== '37' && lengthValue.length !== 4) ? <div className="text-left text-danger">Use 4 digit cvc.</div> : <div></div>}
              {/* {(value !== '37' && value !== '') ? <div className="text-left text-danger">Use 3 digit cvc.</div> : null} */}
              <div className="text-left text-danger" >
                <ErrorMessage name='cvc' />
              </div>
            </div>
            <button type="submit" className="btn btn-danger">Pay Now</button>
          </fieldset>
        </Form>
      </Formik>
    </div>
  )
}
export default PaymentForm
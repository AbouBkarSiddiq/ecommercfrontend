import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Form, Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { object, string, number, date, InferType } from 'yup';
import { createToken } from "../redux/actions/adminActions"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadState, saveState } from '../redux/actions/storageActions';

const PaymentForm = () => {

  const initialValues = {
    number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    amount: localStorage.getItem("priceOfItems")
  }
  const navigate = useNavigate()
  const [fourDigit, setFourDigit] = useState('')
  const [lengthValue, setLengthValue] = useState('')
  // const [amount, setAmount] = useState()
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch();
  const elements = useElements()
  const stripe = useStripe()

  // const [items, setItems] = useState([]);
  // const [price, setPrice] = useState();
  // let cartItems = useSelector((state) => state.storageReducer.cartItems);

  const onSubmit = values => {
    console.log('Fomik values:', values)
    dispatch(createToken(values, navigate))
  }

  const errorObj = {
    error1: "Use 4 digit cvc.",
    error2: "Use 3 digit cvc."
  }

  Yup.addMethod(Yup.string, "cvcLength", function (errorMessage) {
    return this.test(`test-cvc-length`, errorMessage, function (value) {
      const { path, createError } = this;
      return (
        (value && value.length === 3) ||
        createError({ path, message: errorMessage })
      );
    });
  });

  Yup.addMethod(Yup.string, "cvcLengthFour", function (errorMessage) {
    return this.test(`test-cvc-length-four`, errorMessage, function (value) {
      console.log("Fourvalue:", fourDigit)
      const { path, createError } = this;
      return (
        ((fourDigit === '37') && (value && value.length === 4)) ||
        createError({ path, message: errorMessage })
      );
    });
  });

  console.log("Fourvalue:", typeof (fourDigit))

  const validationSchema = Yup.object({
    number: string().required('Required')
      .min(13, 'Minimum card number length must be 13 digits.')
      .max(17, 'Maximum card number length must be 17')
      .matches(/^[0-9]+$/, "Must be only digits"),

    exp_month: number().required('Required')
      .min(1, 'Minimum month should be 1.')
      .max(12, 'Maximum month should be 12.'),
    // .matches(/^[0-9]+$/, "Must be only positive number.")
    // .min(1, 'Minimum month number start from 1.')
    // .max(2, 'Maximum month number must be 12'),

    exp_year: number().required('Required')
      .test('len', 'Must be exactly 4 characters',
        val => val && val.toString().length === 4).min(new Date().getFullYear())
      .test('len', 'Must be exactly 4 characters',
        val => val && val.toString().length === 4).max(new Date().getFullYear() + 50),

    cvc: string().required('No cvc provided.')
      .matches(/^[0-9]+$/, "Must be only positive digits.")
      .test('length3', 'Must be exactly 3 characters',
        val => val && val.length === 3)
    // .test('length4', 'Must be exactly 4 characters',
    // val  => val && val.length === 4 && fourDigit !== '37')
    // .cvcLength('Must be three digits')
    // .cvcLengthFour('Must be four digits'),

  })

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
  console.log("Price of itesm:", localStorage.getItem("priceOfItems"))

  // useEffect(() => {
  //   dispatch(loadState())
  //   setItems(cartItems)
  //   // console.log("This hook works.")
  // }, [])

  // const itemsPrice = items.reduce(function (prev, current) {
  //   return prev + +current.price;
  // }, 0)

  // console.log("Items price at payment form:", itemsPrice)
  // setPrice(itemsPrice)

  return (
    <div>
      {/* <h1 className="">Card Details</h1> */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} class="full">
        <Form>
          <fieldset className="" style={{ paddingLeft: '500px', paddingRight: '500px' }}>
            <div className="d-flex flex-column">
              <label className="d-flex">Amount</label>
              <Field
                type="number"
                name="amount"
                placeholder="Amount"
                // value={itemsPrice}
                readOnly={true}
                style={{ outline: "none" }}
              />
            </div>
            <div className="d-flex flex-column">
              <label className="d-flex">Card Number</label>
              <Field
                type="number"
                name="number"
                placeholder="XXXXXXXXXXXXXX"
                onKeyUp={(e) => {
                  let someValue = e.target.value
                  var result = someValue.match(/.{1,2}/g)
                  setFourDigit(result[0])
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
                  setTouched(true)
                  console.log("Some value:", lengthValue.length)
                  console.log("Value::::::::::", fourDigit)
                }}
              />
              {/* {(touched && lengthValue.length !== 4 && fourDigit === '37') ? <div className="text-left text-danger">{errorObj.error1}</div> : null} */}
              {/* {(touched && lengthValue.length !== 3 && fourDigit !== '37') ? <div className="text-left text-danger">{errorObj.error2}</div> : null} */}
              <div className="text-left text-danger" >
                <ErrorMessage name='cvc' />
              </div>
            </div>
            <button type="submit" className="btn btn-danger" disabled={""}>Pay Now</button>
          </fieldset>
        </Form>
      </Formik>
    </div>
  )
}
export default PaymentForm
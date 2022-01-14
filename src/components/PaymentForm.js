import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createToken } from "../redux/actions/adminActions"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

const PaymentForm = () => {
    // const res = useSelector((state) => state.todoReducer.todos);

    const [number, setNumber] = useState(null)
    const [expMonth, setExpMonth] = useState(null)
    const [expYear, setExpYear] = useState(null)
    const [cvc, setCvc] = useState(null)
    const dispatch = useDispatch();
    
    const elements = useElements()
    const stripe = useStripe()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { number, expMonth, expYear, cvc }
        console.log('Data of card info:', data)
        dispatch(createToken(data))

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

    return (
        <div>
            <h1>Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="" style={{ paddingLeft: '500px', paddingRight: '500px' }}>
                    <label>Card Number</label>
                    <input
                        type="number"
                        name="number"
                        required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <label>Exp Month</label>
                    <input
                        type="number"
                        name="exp_month"
                        required
                        value={expMonth}
                        onChange={(e) => setExpMonth(e.target.value)}
                    />
                    <label>Exp Year</label>
                    <input
                        type="number"
                        required
                        name="exp_year"
                        value={expYear}
                        onChange={(e) => setExpYear(e.target.value)}
                    />
                    <label>CVC</label>
                    <input
                        type="number"
                        name="cvc"
                        required
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                    />
                    {/* <CardElement /> */}
                </div>
                <button className="btn btn-danger" type="submit">Pay</button>
            </form>
        </div>
    )
}

export default PaymentForm

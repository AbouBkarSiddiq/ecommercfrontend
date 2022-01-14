import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store/index'
import { Provider } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const stripePromise = loadStripe("pk_test_51KHkSsGpMGlAcNZe4RTGbHNAMaNFrGsQszQEUhRsobpuRLTZmW5v9RUC4mKifMvP06IOF8XDUJkDmfYQnFr0O0SI007LIYQlIJ");

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise} >
      <Provider store={store}>
        <App />
      </Provider>
    </Elements>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
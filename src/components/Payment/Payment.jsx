import React from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const Payment = () => {
  const { userDates, car } = useSelector((state) => state);
  const stripe = useStripe();
  const elements = useElements();
  console.log(stripe);
  async function handleSubmit(evt) {
    evt.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      const data = await axios.post('http://localhost:3001/api/payment', {
        id,
        amount: car,
      });
      elements.getElement(CardElement).clear();
      console.log(data);
    }
  }
  return (
    <div className='payment'>
      <h3 className='payment__h3'>Tus datos</h3>
      <div className='payment__dates'>
        <p className='payment__name'>
          <span className='payment__span'>Nombre </span>:{'  '}{' '}
          {userDates.user_name}
        </p>
        <p className='payment__shipping'>
          <span className='payment__span'>Shipping</span>:{'  '}
          {userDates.user_shipping_address}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='payment__container'>
          <CardElement />
        </div>
        <div className='payment__div'>
          <button className='payment__button' disabled={!stripe}>
            Buy
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { DELETE_CART } from '../../redux/actions';
import ModalPayment from '../ModalPayment/ModalPayment';
const INITIAL_STATE = {
  open: false,
  total: 0,
};
const Payment = () => {
  const { userDates, car } = useSelector((state) => state);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(INITIAL_STATE);
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
      console.log(data);
      elements.getElement(CardElement).clear();
      dispatch({ type: DELETE_CART });
      setOpen({
        ...open,
        open: true,
        total: data.data.payment.amount,
      });
      setTimeout(() => setOpen(INITIAL_STATE), 4000);
    }
  }
  return (
    <div className='payment'>
      <ModalPayment open={open.open} total={open.total} />
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

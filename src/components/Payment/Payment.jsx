import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { api, DELETE_CART, ERROR } from '../../redux/actions';
import ModalPayment from '../ModalPayment/ModalPayment';
import ModalEspere from '../ModalEspere/ModalEspere';
const INITIAL_STATE = {
  open: false,
  total: 0,
};
const Payment = () => {
  const { userDates, car } = useSelector((state) => state);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [responseBackend, setResponseBackend] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(null);
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      if (!error) {
        setLoading(() => true);
        const { id } = paymentMethod;
        const data = await axios.post(`${api}/api/payment`, {
          id,
          amount: car,
          userid: userDates?.user_id,
        });
        elements.getElement(CardElement).clear();
        dispatch({ type: DELETE_CART });
        setLoading(() => null);
        setResponseBackend({
          ...responseBackend,
          open: true,
          total: data.data.payment.amount,
        });
        setTimeout(() => setResponseBackend(INITIAL_STATE), 4000);
      }
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  }
  return (
    <div className='payment'>
      {responseBackend.open === true ? (
        <ModalPayment total={responseBackend.total} />
      ) : null}
      {loading === null ? null : <ModalEspere />}
      <h3 className='payment__h3'>Tus datos</h3>
      <div className='payment__dates'>
        <p className='payment__name'>
          <span className='payment__span'>Nombre </span>:{'  '}{' '}
          {userDates.user_name}
        </p>
        <p className='payment__shipping'>
          <span className='payment__span'>Dirección</span>:{'  '}
          {userDates.user_shipping_address}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='payment__container'>
          <CardElement />
        </div>
        <div className='payment__div'>
          <button className='payment__button' disabled={!stripe}>
            Pagar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;

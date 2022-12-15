import React from 'react';
import ReactDom from 'react-dom';
const ModalPayment = ({ total = 0, rechazed = true }) => {
  const $payment = document.getElementById('payment');
  return ReactDom.createPortal(
    <div className='response'>
      <div className='response__container response__payment'>
        <div
          className='response__response'
          style={{ color: `${rechazed ? '#ebebeb' : '#ff0000'}` }}
        >
          Tu compra se a realizado con exito con un valor total de {'   '}
          {total?.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
          })}{' '}
        </div>
        <div className='response__div'>
          {rechazed ? (
            <img className='response__image' src='../assets/nice.gif' alt='' />
          ) : (
            <img
              className='response__image'
              src='../assets/cancel.png'
              alt=''
            />
          )}
        </div>
      </div>
    </div>,
    $payment
  );
};

export default ModalPayment;

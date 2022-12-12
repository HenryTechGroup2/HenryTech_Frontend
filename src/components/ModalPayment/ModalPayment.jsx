import React from 'react';
import ReactDom from 'react-dom';
const ModalPayment = ({ total = 0 }) => {
  const $payment = document.getElementById('payment');
  return ReactDom.createPortal(
    <div className='stripe'>
      <div className='stripe__div'>
        <p className='stripe__p'>
          Tu compra se a realizado con exito con un valor total de{' '}
        </p>
        <span className='stripe__span'>
          {total?.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
          })}{' '}
        </span>
        <img
          className='stripe__img'
          src='../assets/nice.gif'
          alt='Exito'
          loading='lazy'
        />
      </div>
    </div>,
    $payment
  );
};

export default ModalPayment;

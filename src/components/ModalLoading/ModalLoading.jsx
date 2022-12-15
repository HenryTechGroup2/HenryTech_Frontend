import React from 'react';

const ModalLoading = () => {
  return (
    <div className='loading'>
      <div className='loader'>
        <div className='loader__container loader__payment'>
          Por favor espere un momento
          <div className='spinner spinner__low'></div>
        </div>
      </div>
    </div>
  );
};

export default ModalLoading;

import React from 'react';

const ModalLoading = () => {
  return (
    <div className='loading'>
      <div className='loader'>
        <div className='loader__container'>
          Por favor espere un momento
          <div className='spinner'></div>
        </div>
      </div>
    </div>
  );
};

export default ModalLoading;

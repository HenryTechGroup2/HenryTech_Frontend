import React from 'react';

const ModalResponse = ({ response, rechazed = true }) => {
  return (
    <div className='response'>
      <div className='response__container'>
        <div
          className='response__response'
          style={{ color: `${rechazed ? '#ebebeb' : '#ff0000'}` }}
        >
          {response}
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
    </div>
  );
};

export default ModalResponse;

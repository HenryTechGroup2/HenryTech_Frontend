import React from 'react';

const ModalResponse = ({ response }) => {
  return (
    <div className='response'>
      <div className='response__container'>
        <div className='response__response'>{response}</div>
        <div className='response__div'>
          <img className='response__image' src='../assets/nice.gif' alt='' />
        </div>
      </div>
    </div>
  );
};

export default ModalResponse;

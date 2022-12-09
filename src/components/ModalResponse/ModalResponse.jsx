import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModalResponse = ({ response, yes, no }) => {
  const navigate = useNavigate();
  const handleClickAcept = (evt) => {
    const { name } = evt.currentTarget;
    name === 'SI' ? navigate(yes) : navigate(no);
  };
  return (
    <div className='response'>
      <div className='response__container'>
        <div className='response__response'>{response}</div>
        <div className='response__div'>
          <img className='response__image' src='../assets/nice.gif' alt='' />
        </div>

        {/* <div className='response__buttons'>
          <button
            className='response__btn'
            name='SI'
            onClick={handleClickAcept}
          >
            Si
          </button>
          <button
            className='response__btn'
            name='NO'
            onClick={handleClickAcept}
          >
            No
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ModalResponse;

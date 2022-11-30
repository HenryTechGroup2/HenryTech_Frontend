import React, { useRef } from 'react';
import { arrowTop } from '../../utils/Icons';

const ButtonTop = () => {
  const buttonRef = useRef();
  window.addEventListener('scroll', () => {
    if (window.pageYOffset < 300) {
      buttonRef.current.classList.add('close');
    } else {
      buttonRef.current.classList.remove('close');
    }
  });
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className='btn-top' ref={buttonRef} onClick={handleClick}>
      {arrowTop}
    </button>
  );
};

export default ButtonTop;
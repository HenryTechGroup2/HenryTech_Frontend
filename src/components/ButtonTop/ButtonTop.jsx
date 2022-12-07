import React, { useRef } from 'react';
import { arrowTop } from '../../utils/Icons';

const ButtonTop = () => {
  const buttonRef = useRef(null);
  window.addEventListener('scroll', () => {
    if (window.pageYOffset < 300) {
      if (buttonRef.current !== null) {
        buttonRef.current.classList.add('close');
      }
    } else {
      if (buttonRef.current !== null) {
        buttonRef.current.classList.remove('close');
      }
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

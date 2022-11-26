import React, { useRef } from 'react';
const images = [
  '../assets/translate.jpg',
  '../assets/translate2.jpg',
  '../assets/translate.jpg',
  '../assets/translate2.jpg',
];
let movimiento = 0;
let nameMove = 'next';
const Images = () => {
  const divRef = useRef();
  const handleClick = (name) => {
    if (name === 'next') {
      if (movimiento >= 300) {
        movimiento = movimiento - 100;
        divRef.current.style.transform = `translateX(-${movimiento}vw)`;
        return (nameMove = 'prev');
      }
      movimiento = movimiento + 100;
      return (divRef.current.style.transform = `translateX(-${movimiento}vw)`);
    } else {
      if (movimiento <= 0) {
        movimiento = movimiento + 100;

        divRef.current.style.transform = `translateX(-${movimiento}vw)`;
        return (nameMove = 'next');
      }
      movimiento = movimiento - 100;
      divRef.current.style.transform = `translateX(-${movimiento}vw)`;
    }
  };
  setInterval(() => {
    handleClick(nameMove);
  }, 10000);

  return (
    <div className='carruzel' ref={divRef}>
      {images.map((image, index) => (
        <div key={index} className='carruzel__div'>
          <div className='carruzel__button'>
            <button className='carruzel__btn' name='prev' onClick={handleClick}>
              <span>{'<'}</span>
            </button>
          </div>
          <img className='carruzel__img' src={image} alt={image} />
          <div className='carruzel__button'>
            <button
              className='carruzel__btn2'
              name='next'
              onClick={(evt) => {
                handleClick('next');
              }}
            >
              <span>{'>'}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Images;

import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { close } from '../../utils/Icons';
const $modal = document.getElementById('mod');
const ModalProductsPC = ({ product, open, handleClick }) => {
  const [productsMapInfo, setProductsInfo] = useState([]);
  const [button, setButton] = useState([]);
  const [carruzel, setCarruzel] = useState(0);
  useEffect(() => {
    const buttons = [];
    product.forEach((_, index) => {
      buttons.push(index + 1);
    });
    setButton(buttons);
    setProductsInfo(product);
    return () => {
      setProductsInfo([]);
    };
  }, [product]);
  const handleClickCarruzel = (index) => {
    const carruzelPage = Number(index) * 23;
    setCarruzel(carruzelPage);
  };
  console.log(carruzel);
  return ReactDom.createPortal(
    <div className='portal'>
      <div className='portal__div'>
        <button className='portal__close' onClick={handleClick}>
          {close}
        </button>
        <div className='portal__carruzel'>
          <div
            className='portal__carruzell'
            style={{ transform: `translateX(-${carruzel}em)` }}
          >
            {productsMapInfo.map((produc) => (
              <div className='portal__map' key={produc?.product_id}>
                <img className='portal__img' src={produc?.product_img} alt='' />
              </div>
            ))}
          </div>
        </div>
        <div className='portal__buttons'>
          {button.map((btn, index) => (
            <button
              onClick={() => handleClickCarruzel(index)}
              name={btn}
              className='portal__btn'
            ></button>
          ))}
        </div>
      </div>
    </div>,
    $modal
  );
};

export default ModalProductsPC;
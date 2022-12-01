import React, { useState } from 'react';
import { info } from '../../utils/Icons';
import ModalInfo from '../ModalInfo/ModalInfo';

const ArmamentCard = ({ product, handleClickAddComponentPc }) => {
  const [open, setOpen] = useState(false);
  const handleClickInfo = (evt) => {
    evt.stopPropagation();
    setOpen(!open);
    console.log('object');
  };

  return (
    <div className='pc__map' onClick={() => handleClickAddComponentPc(product)}>
      <ModalInfo open={open} product={product} handleClick={handleClickInfo} />
      <i className='pc__informacion' onClick={handleClickInfo}>
        {info}
      </i>
      <img className='pc__component' src={product.product_img} alt='' />
      <div className='pc__des'>
        <h3 className='pc__name'>
          {product.product_name.length > 70 ? (
            <span>{product.product_name.slice(0, 70)}...</span>
          ) : (
            product.product_name
          )}
        </h3>
        <span className='pc__price'>${product.product_price}</span>
      </div>
    </div>
  );
};

export default ArmamentCard;

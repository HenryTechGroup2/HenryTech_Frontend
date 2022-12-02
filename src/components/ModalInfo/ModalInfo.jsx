import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { close } from '../../utils/Icons';
const ModalInfo = ({ product, open, handleClick }) => {
  const $info = document.getElementById('info');
  const [acordeon, setAcordeon] = useState(null);

  const informacion = [
    {
      name: 'Description',
      description: product.product_description,
    },
    {
      name: 'Description',
      description: product.product_description,
    },
  ];
  const handleClickDeploy = (index) => {
    if (acordeon === index) return setAcordeon(null);
    setAcordeon(index);
  };
  return ReactDom.createPortal(
    <div
      className='info'
      style={{
        opacity: `${open ? '1' : '0'}`,
        visibility: `${open ? 'visible' : 'hidden'}`,
      }}
    >
      <div className='info__container'>
        <i className='info__i' onClick={handleClick}>
          {close}
        </i>
        <div className='info__acordeon'>
          {informacion.map((info, index) => (
            <div>
              <h3
                onClick={() => handleClickDeploy(index)}
                className='info__name'
              >
                {info.name}
              </h3>
              <p
                className={`info__description ${acordeon === index ? 'x' : ''}`}
              >
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>,
    $info
  );
};

export default ModalInfo;

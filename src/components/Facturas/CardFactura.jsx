import React from 'react';
import { useRef } from 'react';
import { close } from '../../utils/Icons';
import PartFacture from './PartFacture';

const CardFactura = ({ item, open, handleOpenFactura, index }) => {
  const products = item.invoice_detail?.split('-') || null;
  const refModalDiv = useRef(null);
  const handleZIndex = () => {
    refModalDiv.current.classList.toggle('facturas__view');
  };
  return (
    <div className='facturas__flexx' ref={refModalDiv} onClick={handleZIndex}>
      <div className='facturas__click' onClick={() => handleOpenFactura(index)}>
        FACTURA {index + 1}
      </div>
      {open === null ? null : (
        <div className='facturas__modal'>
          <div className='facturas__close'>
            <button
              className='facturas__btn'
              onClick={() => handleOpenFactura(index)}
            >
              {close}
            </button>
          </div>
          <div className='facturas__fact'>
            <div className='facturas__map'>
              {products.slice(0, products.length - 1)?.map((product, index) => (
                <PartFacture product={product} key={index} />
              ))}
            </div>
            <div className='facturas__state'>
              <div>Estado de la compra:{item.order.order_status}</div>
              <div>Total: {item.order.order_total}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardFactura;

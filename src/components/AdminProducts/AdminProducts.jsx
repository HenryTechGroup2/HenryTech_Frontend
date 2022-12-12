import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminLinks from '../AdminLinks/AdminLinks';
import Header from '../Header/Header';
import ProductAdd from '../ProductAdd/ProductAdd';
import CardProduct from './CardProduct';

const AdminProducts = () => {
  const { products } = useSelector((state) => state);
  const [more, setMore] = useState(10);
  const [open, setOpen] = useState(false);
  const moreProducts = () => {
    console.log('xd');
    console.log(more);
    setMore(more + 10);
  };
  const handleAddProduct = () => {
    setOpen(!open);
  };
  return (
    <>
      <Header />
      <AdminLinks />
      {open ? <ProductAdd handleAddProduct={handleAddProduct} /> : null}
      <div className='dashp'>
        <div className='dashp__aux'>
          <img
            className='dashp__add--img'
            src='../assets/add.png'
            alt='Añadir Productos'
            onClick={handleAddProduct}
          />
        </div>
        <div className='dashp__contain'>
          <div className='dashp__flex'>
            <div className='dashp__id'>ID</div>
            <div></div>
            <div className='dashp__name'>Nombre del Producto</div>
            <div className='dashp__ofer'>En oferta</div>
          </div>
          {products.slice(0, more).map((product) => (
            <CardProduct product={product} />
          ))}
        </div>
        <div>
          <button className='dashp__btn' onClick={moreProducts}>
            Ver Mas
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;

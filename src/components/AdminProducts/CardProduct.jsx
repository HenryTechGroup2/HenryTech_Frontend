import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../redux/actions';
import { deleteProduct } from '../../utils/Icons';
import ModalAdmin from '../ModalAdmin/ModalAdmin';

const CardProduct = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [deleteP, setDeleteP] = useState(false);
  const [suspense, setSuspense] = useState(product.product_suspense);
  const handleOpenModal = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const handleChangeSuspense = async (evt) => {
    const { checked } = evt.currentTarget;
    try {
      const { data } = await axios.put(`${api}/api/product/suspense`, {
        product_suspense: checked,
        product_id: product.product_id,
      });
      setSuspense(checked);
      console.log(product);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteProduct = async () => {
    try {
      const { data } = await axios.delete(
        `${api}/api/product/${product.product_id}`
      );
      console.log(data);
      setDeleteP(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ModalAdmin
        open={open}
        handleOpenModal={handleOpenModal}
        product={product}
      />
      {deleteP ? null : (
        <div className='dashp__flex'>
          <div className='dashp__id'>
            <div className='dashp__check'>
              <input
                type='checkbox'
                onChange={handleChangeSuspense}
                checked={suspense ? true : false}
              />
            </div>
            <div className='dashp__number'>{product.product_id}</div>
          </div>
          <div className='dashp__image'>
            <img
              className={`dashp__img ${suspense ? 'dashp__suspense' : ''}`}
              loading='lazy'
              src={product.product_img}
              alt={product.product_name}
            />
          </div>
          <div className='dashp__name'>
            {product.product_name.slice(0, 50)}...
          </div>
          <div className='dashp__ofer'>
            {String(product.product_ofer) === 'true' ? 'Si' : 'No'}
          </div>
          <div className='dashp__button'>
            <button className='dashp__btn' onClick={handleOpenModal}>
              Editar
            </button>
          </div>
          <div className='dashp__delete'>
            <button onClick={handleDeleteProduct} className='dashp__dlt'>
              {deleteProduct}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CardProduct;

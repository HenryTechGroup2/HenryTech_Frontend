import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, ERROR } from '../../redux/actions';
import { deleteProduct } from '../../utils/Icons';
import ModalAdmin from '../ModalAdmin/ModalAdmin';
import ModalResponse from '../ModalResponse/ModalResponse';
import Seguro from '../Seguro/Seguro';
const CardProduct = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [deleteP, setDeleteP] = useState(false);
  const [suspense, setSuspense] = useState(product.product_suspense);
  const [ofert, setOfert] = useState(product.product_ofer);
  const [responseBackend, setResponseBackend] = useState(null);
  const [deletePro, setDeletePro] = useState(false);
  const dispatch = useDispatch();
  const handleOpenModal = (change) => {
    if (change) setOfert(!ofert);
    setOpen(!open);
  };
  const handleChangeSuspense = async (evt) => {
    const { checked } = evt.currentTarget;
    try {
      const { data } = await axios.put(`${api}/api/product/suspense`, {
        product_suspense: checked,
        product_id: product.product_id,
      });
      setSuspense(checked);
      setResponseBackend(data);
      setTimeout(() => {
        setResponseBackend(null);
      }, 2000);
    } catch (error) {
      dispatch({ type: ERROR, payload: 'ERROR LINEA 35 CARDPRODUCT' });
    }
  };
  const handleDeleteProduct = () => {
    setDeletePro(!deletePro);
  };
  const handleDeleteP = (reponse) => {
    setResponseBackend(reponse);
    setDeleteP(true);
    setTimeout(() => {
      setResponseBackend(null);
    }, 2000);
  };
  return (
    <>
      <ModalAdmin
        open={open}
        handleOpenModal={handleOpenModal}
        product={product}
      />
      {responseBackend === null ? null : (
        <ModalResponse response={responseBackend} />
      )}
      {deletePro === false ? null : (
        <Seguro
          handleDeleteProduct={handleDeleteProduct}
          handleDeleteP={handleDeleteP}
          id={product.product_id}
        />
      )}
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
            {String(ofert) === 'true' ? 'Si' : 'No'}
          </div>
          <div className='dashp__button'>
            <button
              className='dashp__btn'
              onClick={() => handleOpenModal(true)}
            >
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

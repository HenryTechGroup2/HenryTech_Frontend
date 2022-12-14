import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { api, ERROR } from '../../redux/actions';

const Seguro = ({ id, handleDeleteProduct, handleDeleteP }) => {
  const dispatch = useDispatch();
  const handleDelete = async (name) => {
    if (name === 'NO') {
      handleDeleteProduct();
      return;
    }
    try {
      const { data } = await axios.delete(`${api}/api/product/${id}`);
      handleDeleteP(data.msg);
      handleDeleteProduct();
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: 'ERROR LINEA 18 ORDER',
      });
    }
  };
  return (
    <div className='seguro'>
      <div className='seguro__div'>
        ¿Esta seguro que lo desea eliminar?
        <div className='seguro__buttons'>
          <button className='seguro__btn' onClick={() => handleDelete('SI')}>
            SI
          </button>
          <button className='seguro__btn' onClick={() => handleDelete('NO')}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seguro;

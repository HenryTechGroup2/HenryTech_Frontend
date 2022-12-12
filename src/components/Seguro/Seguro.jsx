import axios from 'axios';
import React from 'react';
import { api } from '../../redux/actions';

const Seguro = ({ id, handleDeleteProduct, handleDeleteP }) => {
  const handleDelete = async (name) => {
    console.log(name);
    if (name === 'NO') {
      handleDeleteProduct();
      return;
    }
    try {
      const { data } = await axios.delete(`${api}/api/product/${id}`);
      handleDeleteP(data.msg);
      handleDeleteProduct();
    } catch (error) {
      console.log(error);
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

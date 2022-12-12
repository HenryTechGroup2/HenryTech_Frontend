import axios from 'axios';
import React, { useState } from 'react';
import { api } from '../../redux/actions';
import ModalResponse from '../ModalResponse/ModalResponse';

const OneUser = ({ user }) => {
  const [admin, setAdmin] = useState(user.user_isAdmin);
  const [suspense, setSuspense] = useState(user.user_suspense);
  const [responseBackend, setResponseBackend] = useState(null);
  const handleChangeAdmin = async (evt) => {
    const { checked } = evt.currentTarget;
    try {
      const { data } = await axios.put(`${api}/api/user/admin`, {
        user_isAdmin: checked,
        user_id: user.user_id,
      });
      setAdmin(checked);
      setResponseBackend(data.msg);
      setTimeout(() => {
        setResponseBackend(null);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  //
  const handleChangeSuspense = async (evt) => {
    const { checked } = evt.currentTarget;
    try {
      const { data } = await axios.put(`${api}/api/user/suspense`, {
        user_suspense: checked,
        user_id: user.user_id,
      });
      setResponseBackend(data.msg);
      setTimeout(() => {
        setResponseBackend(null);
      }, 2000);
      console.log(data);
      setSuspense(checked);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {responseBackend === null ? null : (
        <ModalResponse response={responseBackend} />
      )}

      <div className='dashp__flex'>
        <div className='dashp__id'>
          <div className='dashp__check'>
            <input
              type='checkbox'
              onChange={handleChangeSuspense}
              checked={suspense ? true : false}
            />
          </div>
          <div className='dashp__number'>{user.user_id}</div>
        </div>
        <div className='dashp__image'>
          {/* <img
            className='dashp__img'
            loading='lazy'
            src={product.product_img}
            alt={product.product_name}
          /> */}
        </div>
        <div className='dashp__name'>{user.user_email}</div>
        <div className='dashp__ofer'>{user.user_name}</div>
        <div className='dashp__button'>
          <input
            type='checkbox'
            onChange={handleChangeAdmin}
            checked={admin ? true : false}
          />
          {String(admin) === 'true' ? 'Si' : 'No'}
        </div>
        <div className='dashp__delete'>
          {/* <button className='dashp__dlt'>{deleteProduct}</button> */}
        </div>
      </div>
    </div>
  );
};

export default OneUser;

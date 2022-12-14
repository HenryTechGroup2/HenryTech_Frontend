import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, ERROR } from '../../redux/actions';
import ModalResponse from '../ModalResponse/ModalResponse';

const OneUser = ({ user }) => {
  const [admin, setAdmin] = useState(user.user_isAdmin);
  const [suspense, setSuspense] = useState(user.user_suspense);
  const [responseBackend, setResponseBackend] = useState(null);
  const dispatch = useDispatch();
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
      dispatch({
        type: ERROR,
        payload: 'LINEA 25 ONEUSER',
      });
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
      setSuspense(checked);
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: 'LINEA 47 ONEUSER',
      });
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
        <div className='dashp__image'></div>
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
        <div className='dashp__delete'></div>
      </div>
    </div>
  );
};

export default OneUser;

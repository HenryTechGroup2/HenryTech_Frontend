import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import { close } from '../../utils/Icons';
import axios from 'axios';
import { api, LOGIN_USER } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { PASSWORD } from '../../redux/storage/variables';
const INITIAL_STATE = {
  email: '',
  password: '',
};
const Modal = ({ open, handleOpenModalSession }) => {
  const { loginWithRedirect } = useAuth0();
  const [login, setLogin] = useState(INITIAL_STATE);
  const [responseBackend, setResponseBackend] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const data = await axios.post(`${api}/api/user/login`, {
        user_email: login.email,
        user_password: login.password,
      });
      console.log(data);
      dispatch({ type: LOGIN_USER, payload: data.data.user });
      handleOpenModalSession(null);
      window.localStorage.setItem(PASSWORD, login.password);
      return setLogin(INITIAL_STATE);
    } catch (error) {
      setTimeout(() => setResponseBackend(null), 2500);
      return setResponseBackend(error.response.data.message);
    }
  };
  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const $modal = document.getElementById('modal');
  //Un portal es una nueva div en el html de react que se utiliza para que no haya inconveniencia con la modal y pueda aplicar el fondo difuminado

  return ReactDom.createPortal(
    <div
      className='modal'
      style={{
        backdropFilter: `${open === null ? 'blur(0)' : 'blur(1em)'}`,
        transform: `${open === null ? 'scale(0)' : 'scale(1)'}`,
      }}
    >
      <div className='modal__container'>
        <i
          className='modal__close'
          onClick={() => handleOpenModalSession(null)}
        >
          {close}
        </i>
        <form className='modal__form' onSubmit={handleSubmit}>
          <input
            placeholder='Email'
            className='modal__login'
            name='email'
            onChange={handleChange}
            value={login.email}
            type='email'
          />
          <input
            placeholder='Password'
            className='modal__login'
            name='password'
            onChange={handleChange}
            value={login.password}
            type='password'
          />
          <div className='modal__acount'>
            <button type='submit' className='modal__button'>
              Login
            </button>
            <Link className='links modal__link' to='/register'>
              You have an account?
            </Link>
          </div>
          <div className='errors'>
            {responseBackend === null ? null : responseBackend}
          </div>
        </form>
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    </div>,
    $modal
  );
};

export default Modal;

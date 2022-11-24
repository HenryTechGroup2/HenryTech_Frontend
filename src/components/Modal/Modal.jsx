import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import { close } from '../../utils/Icons';
const Modal = ({ open, handleOpenModalSession }) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };
  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const $modal = document.getElementById('modal');
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
            <button className='modal__button'>Login</button>
            <Link className='links modal__link' to='/register'>
              You have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>,
    $modal
  );
};

export default Modal;

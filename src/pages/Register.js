import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import { useDispatch } from 'react-redux';
import { api, CREATE_USER } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
const INITIAL_STATE = {
  user_email: '',
  user_name: '',
  user_password: '',
  confirm_password: '',
  user_phone: '',
  user_payment_method: '',
  user_shipping_address: '',
  user_isAdmin: false,
};
const Register = () => {
  const [register, setRegister] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setRegister({
      ...register,
      [name]: value,
    });
  };
  const handleSubmitRegister = async (evt) => {
    evt.preventDefault();
    const data = await axios.post(`${api}/api/user`, {
      user_email: register.user_email,
      user_name: register.user_name,
      user_password: register.user_password,
      // confirm_password: register.confirm_password,
      user_phone: register.user_phone,
      user_payment_method: register.user_payment_method,
      user_shipping_address: register.user_shipping_address,
      user_isAdmin: register.user_isAdmin,
    });
    // console.log(data);
    if (data.status === 200) {
      dispatch({ type: CREATE_USER, payload: data.data.user });
      setRegister(INITIAL_STATE);
      return navigate('/');
    }
    console.log('No registrado');
  };
  return (
    <>
      <Header />
      <div className='register'>
        <div className='register__container'>
          <form className='register__form' onSubmit={handleSubmitRegister}>
            <input
              placeholder='Name'
              className='register__input'
              value={register.user_name}
              name='user_name'
              onChange={handleChange}
              type='text'
            />
            <input
              placeholder='Email'
              className='register__input'
              value={register.user_email}
              name='user_email'
              onChange={handleChange}
              type='email'
            />
            <div>
              <input
                placeholder='Password'
                className='register__input register__password'
                value={register.user_password}
                name='user_password'
                onChange={handleChange}
                type='password'
              />
              <input
                placeholder='Confirm Password'
                className='register__input register__password'
                value={register.confirm_password}
                name='confirm_password'
                onChange={handleChange}
                type='password'
              />
            </div>
            <input
              placeholder='Phone'
              className='register__input'
              value={register.user_phone}
              name='user_phone'
              onChange={handleChange}
              type='text'
            />
            <input
              className='register__input'
              value={register.user_payment_method}
              name='user_payment_method'
              onChange={handleChange}
              type='text'
            />
            <input
              placeholder='Shipping'
              className='register__input'
              value={register.user_shipping_address}
              name='user_shipping_address'
              onChange={handleChange}
              type='text'
            />
            <button className='register__button'>Confirma registro</button>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Register;

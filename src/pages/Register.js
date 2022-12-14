import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import { useDispatch } from 'react-redux';
import { api, CREATE_USER, sendMail } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { PASSWORD } from '../redux/storage/variables';
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
const expresiones = {
  user_name: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
  user_password: /^.{8,12}$/, // 4 a 12 digitos.
  user_email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};
const Register = () => {
  const [register, setRegister] = useState(INITIAL_STATE);
  const [validateRegister, setValidateRegister] = useState({
    user_name: true,
    user_email: true,
    user_password: true,
    equalsPassword: true,
    fieldsNice: true,
  });
  const [responseBackend, setResponseBackend] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setRegister({
      ...register,
      [name]: value,
    });
    setValidateRegister({
      ...validateRegister,
      [name]: expresiones[name].test(value.trim()),
    });
  };
  const handleSubmitRegister = async (evt) => {
    evt.preventDefault();
    if (
      !validateRegister.user_name ||
      !validateRegister.user_email ||
      !validateRegister.user_password ||
      !validateRegister.equalsPassword
    ) {
      setTimeout(() => {
        setValidateRegister({
          ...validateRegister,
          fieldsNice: true,
        });
      }, 2500);
      return setValidateRegister({
        ...validateRegister,
        fieldsNice: false,
      });
    }
    try {
      const data = await axios.post(`${api}/api/user`, {
        user_email: register.user_email,
        user_name: register.user_name,
        user_password: register.user_password,
        user_phone: register.user_phone,
        user_payment_method: register.user_payment_method,
        user_shipping_address: register.user_shipping_address,
        user_isAdmin: register.user_isAdmin,
      });

      if (data.status === 200) {
        dispatch(
          sendMail({
            user_email: register.user_email,
            user_name: register.user_name,
          })
        );
        dispatch({ type: CREATE_USER, payload: data.data.user });
        window.localStorage.setItem(PASSWORD, register.user_password);
        setRegister(INITIAL_STATE);
        return navigate('/');
      }
    } catch (error) {
      setResponseBackend(error.response.data.msg);
    }
  };
  useEffect(() => {
    document.body.classList.remove('body');
  }, []);

  return (
    <>
      <Header />
      <div className='register'>
        <div className='register__container'>
          <form className='register__form' onSubmit={handleSubmitRegister}>
            <div className='register__validate'>
              <input
                placeholder='Nombre'
                className='register__input'
                value={register.user_name}
                name='user_name'
                onChange={handleChange}
                type='text'
              />
              {validateRegister.user_name ? null : (
                <span className='register__span'>
                  El nombre no puede contener numeros y menos de 5 letras
                </span>
              )}
            </div>
            <div className='register__validate'>
              <input
                placeholder='Correo Electronico'
                className='register__input'
                value={register.user_email}
                name='user_email'
                onChange={handleChange}
                type='email'
              />
              {validateRegister.user_email ? null : (
                <span className='register__span'>
                  El correo electronico no es valido
                </span>
              )}
            </div>
            <div className='register__validate'>
              <div>
                <div className='register__dos'>
                  <input
                    placeholder='Contraseña'
                    className='register__input register__password'
                    value={register.user_password}
                    name='user_password'
                    onChange={handleChange}
                    type='password'
                  />
                  <input
                    placeholder='Confirmar Contraseña'
                    className='register__input register__password'
                    value={register.confirm_password}
                    name='confirm_password'
                    onChange={handleChange}
                    type='password'
                  />
                </div>
              </div>
              {validateRegister.user_password ? null : (
                <span className='register__span'>
                  La contraseña tiene que contener minimo 8 caracteres
                </span>
              )}
              {register.user_password !== register.confirm_password &&
              register.user_password.length >= 8 ? (
                <span className='register__span'>
                  Las contraseñas no coinciden
                </span>
              ) : null}
            </div>
            <input
              placeholder='Telefono'
              className='register__input'
              value={register.user_phone}
              name='user_phone'
              onChange={handleChange}
              type='text'
            />

            <input
              placeholder='Metodo de Pagos'
              className='register__input'
              value={register.user_payment_method}
              name='user_payment_method'
              onChange={handleChange}
              type='text'
            />
            <input
              placeholder='Dirección'
              className='register__input'
              value={register.user_shipping_address}
              name='user_shipping_address'
              onChange={handleChange}
              type='text'
            />
            <button className='register__button'>Confirma registro</button>
            <>
              {validateRegister.fieldsNice ? null : (
                <span className=''>
                  Completa los campos para poder registrarte
                </span>
              )}
            </>
            <>
              {responseBackend ? (
                <span>
                  No se a podido registrar el Usuario intente mas tarde o cambie
                  el correo
                </span>
              ) : null}
            </>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Register;

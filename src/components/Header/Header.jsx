import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  api,
  closeSession,
  CREATE_USER_AUTH0,
  FILTER_SEARCH,
  pageHome,
} from '../../redux/actions';
import { cartHeader, pc, userLogin } from '../../utils/Icons';
import CardCar from '../CardCar/CardCar';
import Modal from '../Modal/Modal';
import Payment from '../Payment/Payment';
import UpdateInfo from '../UpdateInfo/UpdateInfo';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import axios from 'axios';
import ModalPayment from '../ModalPayment/ModalPayment';
const Header = () => {
  const { logout, user } = useAuth0();
  const [open, setOpen] = useState(null);
  const { userDates, car, priceTotal, filters } = useSelector((state) => state);
  useEffect(() => {
    const auth0Autentication = async () => {
      const data = await axios.post(`${api}/api/user/login/auth0`, {
        user_email: user?.email,
        user_name: user?.given_name,
      });
      console.log(data);
      dispatch({ type: CREATE_USER_AUTH0, payload: data.data });
    };
    auth0Autentication();
  }, [user]);

  const handleOpenModalSession = (change) => {
    setOpen(change);
    document.body.classList.toggle('body');
  };
  const dispatch = useDispatch();

  const handleChangeProductFilter = (evt) => {
    const { value } = evt.currentTarget;
    dispatch({ type: FILTER_SEARCH, payload: value });
  };

  const handleClick = () => {
    dispatch(pageHome());
  };

  const handleClickCloseSession = () => {
    dispatch(closeSession());
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className='header'>
      <ModalPayment />
      <Modal open={open} handleOpenModalSession={handleOpenModalSession} />
      <div className='header__logo' title='Home'>
        <Link to='/' className='header__henry' onClick={handleClick}>
          <img
            className='header__logo--img'
            src='https://images-ext-1.discordapp.net/external/hqPSUdM9YLb7X0FIFb1I2YfpVuTXma5eLBNlr0oIDvs/https/res.cloudinary.com/dd9tlax1c/image/upload/v1670195957/Logo/Henry-removebg-sin-proyect.png.png'
            alt='Logo_Henry'
            loading='lazy'
          />
        </Link>
      </div>
      <div>
        <input
          className='header__search'
          placeholder='Buscar Productos'
          value={filters.search}
          onChange={handleChangeProductFilter}
          type='text'
        />
      </div>
      <div className='header__options'>
        {userDates?.hasOwnProperty('user_name') ? (
          <div className='header__i'>
            <Link to={`/micuenta/${userDates.user_id}`}>
              <i>{userLogin}</i>
            </Link>
            <button
              className='header__session'
              onClick={handleClickCloseSession}
            >
              Cerrar sesion
            </button>
          </div>
        ) : (
          <span
            title='Login'
            className='header__login'
            onClick={() => handleOpenModalSession('open')}
          >
            Iniciar Sesion
          </span>
        )}

        <div title='Armamento PC'>
          <Link to='/armament-pc'>{pc}</Link>
        </div>
        <div className='header__hover' title='Cart'>
          {cartHeader} <span className='header__length'>{car.length}</span>
          <ul className='header__ul'>
            <li className='carr'>
              <span>Carrito</span>

              <div className='header__carr'>
                <div className='car__total'>
                  {car.length <= 0
                    ? 'No hay productos en el carrito'
                    : `Total:$${priceTotal}.00`}
                </div>
                <Link className='header__carl' to='/car'>
                  Ver de manera completa
                </Link>
                {car?.map((product) => (
                  <CardCar key={product.product_id} product={product} />
                ))}
              </div>
            </li>
            {userDates?.hasOwnProperty('user_name') ? (
              <>
                <li className='purcharse'>
                  <span>Cambiar Datos</span>
                  <div className='header__purcharse'>
                    <UpdateInfo />
                  </div>
                </li>
                <li className='make'>
                  <span>Ir a pagar</span>
                  <div className='header__make'>
                    <Payment />
                  </div>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

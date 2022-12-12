import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  api,
  closeSession,
  CREATE_USER_AUTH0,
  FILTER_SEARCH,
  pageHome,
} from '../../redux/actions';
import {
  cartHeader,
  closeWhite,
  pc,
  search,
  userLogin,
} from '../../utils/Icons';
import Modal from '../Modal/Modal';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import axios from 'axios';
import CardCar from '../CardCar/CardCar';
import Payment from '../Payment/Payment';
import UpdateInfo from '../UpdateInfo/UpdateInfo';
const INITIAL_STATE = { dropitem: null, item: 0 };
const Header = () => {
  const [open, setOpen] = useState(null);
  const [hover, setHover] = useState(null);
  const [wind, setWind] = useState(document.documentElement.clientWidth);
  const [drop, setDrop] = useState(INITIAL_STATE);
  const { dropitem, item } = drop;
  const { logout, user } = useAuth0();
  const inputRef = useRef(null);
  const { userDates, car, filters, priceTotal } = useSelector((state) => state);
  window.addEventListener('resize', () =>
    setWind(document.documentElement.clientWidth)
  );
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
  const handleOpenLeftCart = () => {
    setHover(!hover);
  };
  const handleClickDrop = (itemNumber) => {
    if (itemNumber === drop.item) return setDrop(INITIAL_STATE);
    setDrop({
      dropitem: true,
      item: itemNumber,
    });
  };
  const handleViewSearch = () => {
    console.log('hoxd');
    inputRef.current.classList.toggle('header__viewsearch');
  };
  return (
    <div className='header'>
      {open === null ? null : (
        <Modal handleOpenModalSession={handleOpenModalSession} />
      )}
      <div className='header__logo' title='Home'>
        <Link to='/' className='header__henry' onClick={handleClick}>
          <img
            className='header__logo--img'
            src='../assets/logoh.png'
            alt='Logo_Henry'
            loading='lazy'
          />
        </Link>
      </div>
      <div className='header__barra'>
        <input
          className='header__search'
          placeholder='Buscar Productos'
          value={filters.search}
          onChange={handleChangeProductFilter}
          type='text'
        />
      </div>
      <div className='header__options'>
        {wind <= 538 ? (
          <div className='header__opensearch' onClick={handleViewSearch}>
            {search}
          </div>
        ) : null}

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
        <div
          className='header__hover'
          title='Carrito'
          onClick={handleOpenLeftCart}
        >
          <div className='header__carrito'>
            {cartHeader}{' '}
            <div className='header__length'>
              <div>{car.length}</div>
            </div>
          </div>

          <div></div>
        </div>
        <div className='header__absolutesearch'>
          <input
            ref={inputRef}
            onBlur={handleViewSearch}
            className='header__absolutes '
            placeholder='Buscar Productos'
            value={filters.search}
            onChange={handleChangeProductFilter}
            type='text'
          />
        </div>
      </div>
      {/* <div>
      <input
          className='header__search'
          placeholder='Buscar Productos'
          value={filters.search}
          onChange={handleChangeProductFilter}
          type='text'
        />
      </div> */}
      <div
        style={{ transform: `${hover ? 'translate(0)' : 'translate(310px)'}` }}
        className='header__translate'
      >
        <div className='header__top'>
          Mi carrito{' '}
          <button className='header__btn' onClick={handleOpenLeftCart}>
            {closeWhite}
          </button>
        </div>
        <div className='header__center'>
          {/* <Link className='header__carl' to='/car'>
            Ver de manera completa
          </Link> */}
          {car.length <= 0 && (
            <div className='header__image'>
              <span className='header__span'>
                No tienes producto en el carrito
              </span>
              <img
                className='header__img'
                src='../assets/cart.png'
                alt='Cart'
              />
            </div>
          )}
          {car?.map((product) => (
            <CardCar key={product.product_id} product={product} />
          ))}
        </div>
        <div className='header__bottom'>
          <div className='header__item'>Total</div>
          <div className='header__total'>
            {Number(priceTotal).toLocaleString('es-AR', {
              style: 'currency',
              currency: 'ARS',
            })}
          </div>
        </div>
        <>
          <div className='header__bottom'>
            <div className='header__item'>CAMBIAR DATOS</div>
            <div onClick={() => handleClickDrop(2)} className='header__drop'>
              <img src='../assets/drop.png' alt='' />
            </div>
          </div>
          <div
            style={{
              height: `${dropitem && item === 2 ? '18em' : '0'}`,
              opacity: `${dropitem && item === 2 ? '1' : '0'}`,
              visibilty: `${dropitem && item === 2 ? 'visible' : 'hidden'}`,
            }}
            className='header__dropitem'
          >
            <UpdateInfo />
          </div>
        </>
        <>
          <div className='header__bottom'>
            <div className='header__item'>FINALIZAR</div>
            <div onClick={() => handleClickDrop(1)} className='header__drop'>
              <img src='../assets/drop.png' alt='' />
            </div>
          </div>
          <div
            style={{
              height: `${dropitem && item === 1 ? '18em' : '0'}`,
              opacity: `${dropitem && item === 1 ? '1' : '0'}`,
              visibilty: `${dropitem && item === 1 ? 'visible' : 'hidden'}`,
            }}
            className='header__dropitem'
          >
            <Payment />
          </div>
        </>
      </div>
    </div>
  );
};

export default Header;

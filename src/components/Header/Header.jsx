import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeSession, FILTER_SEARCH, pageHome } from '../../redux/actions';
import { cartHeader, userLogin } from '../../utils/Icons';
import CardCar from '../CardCar/CardCar';
import Modal from '../Modal/Modal';
import Payment from '../Payment/Payment';
import UpdateInfo from '../UpdateInfo/UpdateInfo';

const Header = () => {
  const [open, setOpen] = useState(null);
  const { userDates, car, priceTotal, filters } = useSelector((state) => state);
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
  };
  return (
    <div className='header'>
      <div className='header__logo'>
        <Link to='/' className='header__henry' onClick={handleClick}>
          Henry - Tech
        </Link>
      </div>
      <div>
        <input
          className='header__search'
          placeholder='Search Products'
          value={filters.search}
          onChange={handleChangeProductFilter}
          type='text'
        />
      </div>
      <div className='header__options'>
        {userDates.hasOwnProperty('user_name') ? (

        

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
            className='header__login'
            onClick={() => handleOpenModalSession('open')}
          >
            Iniciar Sesion
          </span>
        )}

        <Modal open={open} handleOpenModalSession={handleOpenModalSession} />

        <div className='header__hover'>
          {cartHeader} <span className='header__length'>{car.length}</span>
          <ul className='header__ul'>
            <li className='carr'>
              <span>Car</span>
              <div className='header__carr'>
                <div className='car__total'>
                  {car.length <= 0
                    ? 'No products added to cart'
                    : `Total:$${priceTotal}.00`}
                </div>

                {car?.map((product) => (
                  <CardCar key={product.product_id} product={product} />
                ))}
              </div>
            </li>
            <li className='purcharse'>
              <span>Purchase data</span>
              <div className='header__purcharse'>
                <UpdateInfo />
              </div>
            </li>
            <li className='make'>
              <span>Make payment</span>
              <div className='header__make'>
                <Payment />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

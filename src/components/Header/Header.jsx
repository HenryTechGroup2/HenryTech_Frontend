import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeSession, FILTER_SEARCH, pageHome } from '../../redux/actions';
import { cartHeader, pc, userLogin } from '../../utils/Icons';
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
  console.log(userDates);
  return (
    <div className='header'>
      <Modal open={open} handleOpenModalSession={handleOpenModalSession} />
      <div className='header__logo' title='Home'>
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
        {userDates?.hasOwnProperty('user_name') ? (
          <div className='header__i'>
            {userLogin}
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

        <div title='Armament PC'>
          <Link to='armament'>{pc}</Link>
        </div>
        <div className='header__hover' title='Cart'>
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
              </>
            ) : (
              <li className='make'>
                <Link to='temporary-data'>Add dates</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

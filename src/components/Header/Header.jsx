import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FILTER_SEARCH } from '../../redux/actions';
import { cartHeader, userLogin } from '../../utils/Icons';
import Modal from '../Modal/Modal';

const Header = () => {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState('');
  const { userDates, car } = useSelector((state) => state);
  const handleOpenModalSession = (change) => setOpen(change);
  const dispatch = useDispatch();
  const handleChangeProductFilter = (evt) => {
    const { value } = evt.currentTarget;
    setSearch(value);
    dispatch({ type: FILTER_SEARCH, payload: value });
  };
  return (
    <div className='header'>
      <div className='header__logo'>
        <Link to='/' className='header__henry'>
          Henry - Tech
        </Link>
      </div>
      <div>
        <input
          className='header__search'
          placeholder='Search Products'
          value={search}
          onChange={handleChangeProductFilter}
          type='text'
        />
      </div>
      <div className='header__options'>
        {userDates.hasOwnProperty('user_name') ? (
          <i>{userLogin}</i>
        ) : (
          <span
            className='header__login'
            onClick={() => handleOpenModalSession('open')}
          >
            Iniciar Sesion
          </span>
        )}

        <Modal open={open} handleOpenModalSession={handleOpenModalSession} />
        <Link to='/car' className='header__cart'>
          <div className='header__hover'>
            {cartHeader} <span className='header__length'>{car.length}</span>
            <ul className='header__ul'>
              <li className='carr'>
                <span>Car</span>
                <div className='header__carr'>Hello World</div>
              </li>
              <li className='purcharse'>
                <span>Purchase data</span>
                <div className='header__purcharse'>Hello World</div>
              </li>
              <li className='make'>
                <span>Make payment</span>
                <div className='header__make'>Hello World</div>
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;

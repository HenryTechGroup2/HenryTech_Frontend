import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartHeader, userLogin } from '../../utils/Icons';
import Modal from '../Modal/Modal';

const Header = () => {
  const [open, setOpen] = useState(null);
  const { userDates, car } = useSelector((state) => state);
  const handleOpenModalSession = (change) => setOpen(change);

  return (
    <div className='header'>
      <div className='header__logo'>
        <Link to='/' className='header__henry'>
          Henry - Tech
        </Link>
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
              <li className='header__li carr'>Car</li>
              <li className='header__li purcharse'>Purchase data</li>
              <li className='make'>
                <span className='header__li'>Make payment</span>
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

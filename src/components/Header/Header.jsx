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

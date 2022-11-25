import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartHeader, userLogin } from '../../utils/Icons';
import Modal from '../Modal/Modal';

const Header = () => {
  const [open, setOpen] = useState(null);
  const { userDates } = useSelector((state) => state);
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
        <i className='header__cart'>{cartHeader}</i>
      </div>
    </div>
  );
};

export default Header;

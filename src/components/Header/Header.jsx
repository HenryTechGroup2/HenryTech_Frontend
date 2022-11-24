import React from 'react';
import { cartHeader } from '../../utils/Icons';

const Header = () => {
  return (
    <div className='header'>
      <div className='header__logo'>
        <span className='header__henry'>Henry - Tech</span>
      </div>
      <div className='header__options'>
        <span className='header__login'>Iniciar Sesion</span>
        <i className='header__cart'>{cartHeader}</i>
      </div>
    </div>
  );
};

export default Header;

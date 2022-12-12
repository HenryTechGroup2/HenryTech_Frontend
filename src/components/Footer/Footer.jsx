import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export const images = [
  '../pagos/link.jpg',
  '../pagos/visa.png',
  '../pagos/maestro.png',
  '../pagos/mastercard.png',
  '../pagos/american-express.png',
];
function Footer() {
  const { userDates } = useSelector((state) => state);
  return (
    <div className='footer' style={{ position: 'relative', zIndex: '20' }}>
      <div className='footer__div'>
        <h3 className='footer__h1'>Empresa</h3>
        <ul className='footer__ul'>
          <Link to='/'>
            <li className='footer__li'>Inicio</li>
          </Link>
          <Link to='/preguntasfrecuentes'>
            <li className='footer__li'>Preguntas frecuentes</li>
          </Link>
          <Link to='/sobrenosotros'>
            <li className='footer__li'>Sobre nosotros</li>
          </Link>
          {userDates?.hasOwnProperty('user_name') &&
          userDates?.user_isAdmin === true ? (
            <Link to='/admin'>ADMINISTRADOR</Link>
          ) : null}
        </ul>
      </div>
      <div>
        <h3 className='footer__pago'>Métodos de pago</h3>
        <div className='footer__image'>
          {images.map((image) => (
            <img
              key={image}
              className='footer__img'
              src={image}
              alt={image}
              loading='lazy'
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;

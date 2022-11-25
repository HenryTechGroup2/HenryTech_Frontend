import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div style={{ width: '50' }}>
      <h1>Empresa</h1>
      <ul>
        <Link to='/home'>
          <li>Inicio</li>
        </Link>
        <Link to='/preguntas frecuentes'>
          <li>Preguntas frecuentes</li>
        </Link>
        <Link to='/sobrenosotros'>
          <li>Sobre nosotros</li>
        </Link>
      </ul>
    </div>
  );
}

export default Footer;

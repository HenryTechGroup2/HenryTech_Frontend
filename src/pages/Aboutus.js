import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

function Aboutus() {
  return (
    <>
      <Header />
      <div className='about'>
        <div className='about__container'>
          <h1 className='about__h1'>BIENVENIDO A HENRYTECH</h1>
          <p className='about__p'>
            Nuestro objetivo es y seguirá siendo siempre ser esa tienda de
            tecnología en la que tú puedes confiar, en la que vas a encontrar
            los productos de tecnología que necesitas y deseas para disfrutar de
            la vida al máximo 100% originales, brindandote siempre la mejor
            asesoría y precios increíbles.
          </p>
          <h2 className='about__h2'>
            Este proyecto fue realizado por alumnos de Henry
          </h2>
          {/* <ul>
            <li>Jonatan Valdiviezo</li>
            <li>Huari Patey Paz</li>
            <li>Tobi</li>
          </ul> */}
        </div>
        <p></p>
      </div>
      <Footer />
    </>
  );
}

export default Aboutus;

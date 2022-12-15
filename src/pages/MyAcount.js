import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../redux/actions.js';
import Card from '../components/Card/Card.jsx';
import UpdateUser from '../components/UpdateUser/UpdateUser.jsx';
import Header from '../components/Header/Header.jsx';
import { useState } from 'react';
import Footer from '../components/Footer/Footer.jsx';
import Facturas from '../components/Facturas/Facturas.jsx';
import { useRef } from 'react';

export function MyAcount() {
  const params = useParams();
  const id = params.id;
  const [wind, setWind] = useState(document.documentElement.clientWidth);
  const dispatch = useDispatch();
  const [renderMap, setRenderMap] = useState('Configuracion');

  const route = '../assets/config';
  const { userDates } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  userDates?.user_favorites?.forEach((product) => {
    product.product_favorite = true;
    if (product.product_ofer === true) {
      product.oferta =
        Number(product.product_price) - Number(product.product_price) / 5;
    }
  });
  const leftMap = [
    {
      name: userDates?.user_name,
      image: `${route}/perfil.png`,
      component: 'Configuracion',
    },
    { name: 'Favoritos', image: `${route}/heart .png`, component: 'Favoritos' },
    {
      name: 'Facturas',
      image: `${route}/invo.png`,
      component: 'Facturas',
    },
  ];
  const handleMapRender = (render) => {
    setRenderMap(render);
  };
  window.addEventListener('resize', () =>
    setWind(document.documentElement.clientWidth)
  );
  const divRef = useRef(null);
  const closeLeftDiv = useRef(null);
  const handleOpenConfig = () => {
    divRef.current.classList.toggle('acount__dropview');
  };
  const handleCLoseLeftDiv = () => {
    closeLeftDiv.current.classList.toggle('acount__toggle');
  };
  return (
    <>
      <Header />
      {Object.values(userDates).length > 0 ? (
        <div className='acount'>
          <div className='acount__drop'>
            <div className='acount__left' ref={divRef}>
              {leftMap.map((item, index) => (
                <div
                  key={index}
                  className='acount__div'
                  onClick={() => handleMapRender(item.component)}
                >
                  <img
                    className='acount__image'
                    src={item.image}
                    alt={item.name}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className='acount__flex' ref={closeLeftDiv}>
            <div className='acount__right'>
              <div className='update__config'>
                <img
                  src='../assets/responsive/config.png'
                  alt=''
                  className='update__buttonopen'
                  onClick={handleOpenConfig}
                />
              </div>
              {renderMap === 'Favoritos' ? (
                <div className='acount__favorites'>
                  {userDates.user_favorites.length === 0 ? (
                    <div className='acount__add'>
                      <div className='acount__text'>
                        {' '}
                        Agregue los productos que mas le gusten.
                      </div>
                      <img
                        className='acount__heart'
                        src='../assets/favorit.png'
                        alt=''
                      />
                    </div>
                  ) : (
                    userDates.user_favorites.map((favorites) => (
                      <Card
                        key={favorites.product_id}
                        product={favorites}
                        alto='8'
                        ancho='8'
                        view={true}
                      />
                    ))
                  )}
                  {}
                </div>
              ) : renderMap === 'Configuracion' ? (
                <UpdateUser user={userDates} id={id} />
              ) : renderMap === 'Facturas' ? (
                <Facturas handleCLoseLeftDiv={handleCLoseLeftDiv} />
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className='loader'>
          <div className='spinner'> </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default MyAcount;

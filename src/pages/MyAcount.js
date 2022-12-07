import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../redux/actions.js';
import Card from '../components/Card/Card.jsx';
import Invoice from '../components/Invoice/Invoice.jsx';
import UpdateUser from '../components/UpdateUser/UpdateUser.jsx';
import { favorit } from '../utils/Icons.js';
import Header from '../components/Header/Header.jsx';
import { render } from 'react-dom';
import { useState } from 'react';
import Footer from '../components/Footer/Footer.jsx';

export function MyAcount() {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const [renderMap, setRenderMap] = useState('Configuracion');
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  const route = '../assets/config';
  const { userDates } = useSelector((state) => state);
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
  return (
    <>
      <Header />
      {Object.values(userDates).length > 0 ? (
        <div className='acount'>
          <div className='acount__drop'>
            <div className='acount__left'>
              {leftMap.map((item) => (
                <div
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
          <div className='acount__flex'>
            <div className='acount__right'>
              {renderMap === 'Favoritos' ? (
                <div className='acount__favorites'>
                  {userDates.user_favorites.length === 0 ? (
                    <div className='acount__add'>
                      <div className='acount__text'>
                        {' '}
                        Agregue los productos que mas le gusten
                      </div>
                      <img src='../assets/favorit.png' alt='' />
                    </div>
                  ) : (
                    userDates.user_favorites.map((favorites) => (
                      <Card
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
              ) : renderMap === 'Facturas' ? null : null}
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

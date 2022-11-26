import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  deleteDetailsProducts,
  getDetailsProducts,
} from '../../redux/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CreateReview from '../CreateReview/CreateReview.jsx';
import ReactImageMagnify from 'react-image-magnify';
import ParticlesBackground from '../Particles/ParticlesBackground.jsx';
import Count from '../Count/Count.jsx';
import Footer, { images as imagesPagos } from '../Footer/Footer.jsx';
import Star from '../Star/Star.jsx';
import { favorit, notFavorit, stock } from '../../utils/Icons.js';
import Header from '../Header/Header.jsx';
export function Details() {
  const params = useParams();

  const dispatch = useDispatch();

  const { detailsProduct } = useSelector((state) => state);
  const [imagePrincipal, setImagePrincipal] = useState('');
  const [borderImage, setBorderImage] = useState(null);
  //   //   const products = useSelector((state) => state.products);
  //   //   const userloggin = useSelector((state) => state.userloggin);
  useEffect(() => {
    dispatch(getDetailsProducts(params.id));

    return () => {
      dispatch(deleteDetailsProducts());
    };
  }, [dispatch, params]);
  const handleChangeImage = (image, index) => {
    setImagePrincipal(image);
    setBorderImage(index);
  };

  const images = detailsProduct?.product_array_img?.concat(
    detailsProduct?.product_img
  );

  return (
    <>
      <Header />
      <ParticlesBackground />
      <div className='details'>
        <div className='details__images'>
          {images !== undefined &&
            images
              ?.reverse()
              ?.map((product, index) => (
                <img
                  key={product}
                  onMouseEnter={() => handleChangeImage(product, index)}
                  className={`details__image ${
                    borderImage === index ? 'details__border' : ''
                  }`}
                  loading='lazy'
                  src={product}
                  alt={product}
                />
              ))}
        </div>
        <div className='details__center'>
          {imagePrincipal.length > 0 ? (
            <div className='details__special'>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: imagePrincipal,
                  },
                  largeImage: {
                    src: imagePrincipal,
                    width: 1200,
                    height: 1800,
                  },
                  enlargedImageContainerDimensions: {
                    width: 400,
                    height: 400,
                  },
                  // enlargedImagePosition: 'over',
                }}
              />
            </div>
          ) : (
            <img
              className='details__img'
              src={detailsProduct?.product_img}
              alt=''
            />
          )}
        </div>
        <div className='details__description'>
          <div>
            <div className='details__left'>
              <h2 className='details__h2'>
                <p className='details__name'>{detailsProduct?.product_name}</p>
                <Star detailsProduct={detailsProduct} />
                <button className='details__favorit'>{favorit}</button>{' '}
              </h2>
              <div>
                <p className='details__price'>
                  <div className='details__stock'>
                    {stock}

                    <span className='details__dis'>{`  Stock disponible`}</span>
                  </div>
                  ${detailsProduct?.product_price}
                </p>
                <Count product={detailsProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='details__bot'>
        <div className='details__dpago'>
          <div className='details__bottom'>
            {detailsProduct.product_description}
          </div>
          <div className='details__pago'>
            <span className='details__span'> Medios de Pago</span>
            <div className='details__map'>
              {imagesPagos.map((image) => (
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
        <CreateReview />
        <div className='comentarios'>
          <h2 className='comentarios__h2'>Opiniones del producto</h2>
          <div className='comentarios__div'>
            <div className='comentarios__star'>
              <div className='comentarios__rating'>
                <div className='comentarios__cal'>
                  {detailsProduct.product_rating}
                </div>
                <div className='comentarios__r'>
                  <Star detailsProduct={detailsProduct} none={false} />
                  {`297 calificaciones`}
                </div>
              </div>
              <div></div>
            </div>
            <div className='comentarios__coment'>
              <div>
                <select>
                  <option value='Ordenar'>Ordenar</option>
                  <option value='Ordenar'>Mas recientes</option>
                  <option value='Ordenar'>Mas utiles</option>
                </select>
                <select>
                  <option value='Calificacion'>Calificacion</option>{' '}
                  <option value='Calificacion'>5★</option>{' '}
                  <option value='Calificacion'>4★</option>{' '}
                  <option value='Calificacion'>3★</option>{' '}
                  <option value='Calificacion'>2★</option>{' '}
                  <option value='Calificacion'>1★</option>
                </select>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Details;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  api,
  deleteDetailsProducts,
  FILTER_STAR,
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
import { camion, noStock, security, stock } from '../../utils/Icons.js';
import Header from '../Header/Header.jsx';
import { ToastContainer } from 'react-toastify';
import ButtonTop from '../ButtonTop/ButtonTop.jsx';
import ButtonFavorite from '../ButtonFavorite/ButtonFavorite.jsx';
import io from 'socket.io-client';
// import loader from '../../loader.gif';

const starsMap = ['★★★★★', '★★★★', '★★★', '★★', '★'];
const INITIAL_STATE = { openSelect: null, drop: 0 };
export function Details() {
  const params = useParams();

  const dispatch = useDispatch();
  const server = io(api);
  const [select, setSelect] = useState(INITIAL_STATE);
  const { openSelect, drop } = select;
  const { detailsProduct } = useSelector((state) => state);
  const [imagePrincipal, setImagePrincipal] = useState('');
  const [borderImage, setBorderImage] = useState(null);

  const { detailsReviews, reviews, loadingReviews } = useSelector(
    (state) => state
  );

  useEffect(() => {
    server.emit('@product/view', params.id);

    dispatch(getDetailsProducts(params.id));
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    server.emit('@product/view', params.id);
    return () => {
      dispatch(deleteDetailsProducts());
    };
  }, []);

  const handleChangeImage = (image, index) => {
    setImagePrincipal(image);
    setBorderImage(index);
  };

  const handleFilterStar = (star) => {
    dispatch({ type: FILTER_STAR, payload: star });
  };
  const handleOpenSelect = (open) => {
    if (select.drop === open) return setSelect(INITIAL_STATE);
    setSelect({
      ...select,
      openSelect: true,
      drop: open,
    });
  };
  const images = detailsProduct?.product_array_img?.concat(
    detailsProduct?.product_img
  );

  const promedioStar = reviews?.reduce((a, b) => a + b.review_score, 0);

  const stars = isNaN(promedioStar / reviews?.length)
    ? 1
    : promedioStar / reviews?.length;

  return (
    <>
      <Header />
      <ButtonTop />
      <ParticlesBackground />
      <ToastContainer />
      {loadingReviews ? (
        <>
          <div className='details'>
            <div className='details__images'>
              {images !== undefined &&
                images
                  ?.reverse()
                  ?.map((product, index) => (
                    <img
                      key={index}
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
              {imagePrincipal?.length > 0 ? (
                <div className='details__special'>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: imagePrincipal,
                        // isFluidWidth: true,
                        src: imagePrincipal,
                        height: 450,
                        width: 480,
                      },
                      largeImage: {
                        src: imagePrincipal,
                        width: 1000,
                        height: 850,
                      },
                      enlargedImageContainerDimensions: {
                        width: 550,
                        height: 640,
                      },
                      enlargedImagePortalId: 'portal',
                      fadeDurationInMs: 0,
                    }}
                  />
                </div>
              ) : (
                <div className='details__special'>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: detailsProduct?.product_img,
                        // isFluidWidth: true,
                        src: detailsProduct?.product_img,
                        height: 450,
                        width: 480,
                      },
                      largeImage: {
                        src: detailsProduct?.product_img,
                        width: 1000,
                        height: 850,
                      },
                      enlargedImageContainerDimensions: {
                        width: 550,
                        height: 640,
                      },
                      enlargedImagePortalId: 'portal',
                      fadeDurationInMs: 0,
                    }}
                  />
                </div>
              )}
            </div>
            <div className='details__description'>
              <div>
                <div className='details__portal'>
                  <div id='portal'></div>
                </div>
                <div className='details__left'>
                  <h2 className='details__h2'>
                    <p className='details__name'>
                      {detailsProduct?.product_name}
                    </p>
                    <Star detailsReviews={detailsProduct.product_rating} />
                    <ButtonFavorite product={detailsProduct} />
                  </h2>
                  <div
                    className='details__centerx'
                    style={{ alignSelf: 'flex-start' }}
                  >
                    <div className='details__brand'>
                      {' '}
                      Marca: {detailsProduct?.product_brand}
                    </div>
                    <div className='details__views'>
                      Cantidad de visualizaciones:
                      {detailsProduct?.product_views}
                    </div>
                    <div className='details__send'>
                      Envios a todo el pais {camion}
                    </div>
                    <div className='details__send'>
                      Garantia oficial de 12 meses {security}
                    </div>
                    <div>
                      Podes comprar hasta {detailsProduct?.stock.stock_amount}{' '}
                      productos
                    </div>
                  </div>

                  <div className='details__mar'>
                    <div className='details__price'>
                      <div className='details__stock'>
                        {detailsProduct?.stock?.stock_amount > 0 ? (
                          <div>{stock} Stock</div>
                        ) : (
                          <div>{noStock} Stock</div>
                        )}
                      </div>
                      <div>
                        {Number(detailsProduct?.product_price).toLocaleString(
                          'es-Ar',
                          {
                            style: 'currency',
                            currency: 'ARS',
                          }
                        )}
                      </div>
                    </div>
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

            <div className='comentarios'>
              <div className='comentarios__div'>
                <div className='comentarios__star'>
                  <div className='comentarios__rating'>
                    <div className='comentarios__cal'>{Math.floor(stars)}</div>
                    <div className='comentarios__r'>
                      <Star
                        detailsReviews={detailsProduct.product_rating}
                        none={false}
                      />
                      {`${detailsReviews?.length} calificaciones`}
                    </div>
                  </div>
                </div>
                <div className='comentarios__coment'>
                  <div className='comentarios__select'>
                    <div className='drop__select'>
                      <div className='drop'>
                        <div className='drop__review'>CALIFICACION</div>
                        <img
                          onClick={() => handleOpenSelect(1)}
                          className='drop__image'
                          src='../assets/drop.png'
                          alt=''
                        />
                      </div>
                      <div
                        className='drop__map'
                        style={{
                          display: `${
                            openSelect && drop === 1 ? 'block' : 'none'
                          }`,
                        }}
                      >
                        {starsMap.map((star) => (
                          <div
                            onClick={() => handleFilterStar(star.length)}
                            className='drop__star'
                          >
                            {star}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='comentarios__bottom'>
                    {detailsReviews?.map((review) => (
                      <div className='comentarios__mapr' key={review.review_id}>
                        <h3 className='comentarios__h3'>
                          {'★'.repeat(review.review_score).padEnd(5, '☆')}
                        </h3>
                        <p className='comentarios__p'>{review.review_body}</p>
                      </div>
                    ))}
                    <CreateReview productId={detailsProduct.product_id} />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      ) : (
        <div className='loader'>
          <div className='spinner'></div>
          {/* <img
            className='home__image-gif'
            src={loader}
            alt='Loader'
            loading='lazy'
          /> */}
        </div>
      )}
    </>
  );
}
export default Details;

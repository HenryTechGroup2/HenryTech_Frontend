import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArmamentCard from '../components/AramamentCard/ArmamentCard';
import Header from '../components/Header/Header';
import PCComponetn from '../components/PCComponent/PCComponetn';
import { addProductPC, addToCartProductsArmamentPC } from '../redux/actions';
import { armamentPcImages } from '../utils/helpers';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const brand = [
  { name: '../assets/amd.png', marca: 'AMD' },
  { name: '../assets/intel.png', marca: 'INTEL' },
];
const buttons = ['Teclados', 'Mouses', 'Microfonos', 'Auriculares'];
const ArmamentPc = () => {
  const [select, setSelect] = useState('Procesadores');
  const [complete, setComplete] = useState(false);
  const [selectBrand, setSelectBrand] = useState('INTEL');
  const [periferico, setPeriferico] = useState('Teclados');
  const { products, armamentPc } = useSelector((state) => state);
  const navigate = useNavigate();
  const handleClick = (slct) => {
    setSelect(slct);
    setComplete(false);
  };
  const dispatch = useDispatch();
  const description = armamentPcImages.find(
    (component) =>
      component.img1.name === select || component.img2.name === select
  );
  const descriptionPc = [description.img1, description.img2];
  const descriptionH1 = descriptionPc.find(
    (component) => component.name === select
  );

  let productsAcept = products.filter((product) => {
    if (select === 'Procesadores') {
      return (
        product?.product_category.toLowerCase() === select.toLowerCase() &&
        product?.product_brand.toLowerCase() === selectBrand.toLowerCase()
      );
    }
    if (select === 'Perifericos') {
      return (
        product?.product_category.toLowerCase() === 'auriculares' ||
        product?.product_category.toLowerCase() === 'microfonos' ||
        product?.product_category.toLowerCase() === 'camaras' ||
        product?.product_category.toLowerCase() === 'mouses' ||
        product?.product_category.toLowerCase() === 'teclados'
      );
    }
    return product?.product_category.toLowerCase() === select.toLowerCase();
  });
  let x = 0;
  if (select === 'Perifericos') {
    productsAcept = productsAcept.filter(
      (product) =>
        product.product_category.toLowerCase() === periferico.toLowerCase()
    );
  }
  const handleClickAddComponentPc = (addProduct) => {
    dispatch(addProductPC(addProduct));
  };
  const priceTotal = armamentPc?.reduce(
    (a, b) => a + Number(b.product_price) * Number(b.product_count),
    0
  );
  const changePageComplete = () => {
    setComplete(!complete);
  };
  const handleSelectBrand = (brand) => {
    setSelectBrand(brand);
  };
  const countProductsPC = armamentPc
    .filter(
      (product) =>
        product.product_category.toLowerCase() ===
          'Procesadores'.toLowerCase() ||
        product.product_category.toLowerCase() ===
          'Placas Madres'.toLowerCase() ||
        product.product_category.toLowerCase() === 'Gpu'.toLowerCase() ||
        product.product_category.toLowerCase() ===
          'Memorias Ram'.toLowerCase() ||
        product.product_category.toLowerCase() ===
          'Almacenamiento'.toLowerCase() ||
        product.product_category.toLowerCase() ===
          'Fuentes De Poder'.toLowerCase() ||
        product.product_category.toLowerCase() === 'Gabinete'.toLowerCase()
    )
    .map((product) => product.product_category);
  const productsCategoryUnique = [...new Set(countProductsPC)];
  const handleClickNotBuy = () => {
    toast.warn(
      'Necesitas al menos 1 CPU, Motherboard, Ram, Fuente de Poder, Almacenamiento, GPU, y Gabinete.',
      {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      }
    );
  };
  const handleToCart = () => {
    dispatch(addToCartProductsArmamentPC(armamentPc, priceTotal));
    navigate('/car');
  };
  const handleFilterPeriferico = (category) => {
    setPeriferico(category);
  };
  return (
    <>
      <Header />
      <div className='pc'>
        <ToastContainer />
        <div className='pc__container'>
          <h1 className='pc__h1'>Elegi tu {descriptionH1.name} </h1>
          <p className='pc__description'>{descriptionH1.description}</p>
          <div className='pc__mark'>
            <div className='pc__brand'>
              {brand.map((item) => (
                <img
                  key={item.marca}
                  onClick={() => handleSelectBrand(item.marca)}
                  className={` pc__image ${
                    selectBrand === item.marca
                      ? item.marca === 'AMD'
                        ? 'pc__amd'
                        : 'pc__intel'
                      : ''
                  } `}
                  src={item.name}
                  alt={item.name}
                />
              ))}
            </div>
          </div>
          <div className='pc__components'>
            <div className='pc__left'>
              {armamentPcImages.map((image) => (
                <PCComponetn
                  key={image.img1.name}
                  handleClick={handleClick}
                  select={select}
                  armamentPc={armamentPc}
                  image={image}
                />
              ))}
              <div className='pc__dates'>
                <div className='pc__total'>
                  Total:
                  {Number(priceTotal.toFixed(2)).toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                  })}
                </div>
                {productsCategoryUnique.length >= 6 ? (
                  <button className='pc__buy' onClick={changePageComplete}>
                    SIGUIENTE
                  </button>
                ) : (
                  <button className='pc__buy' onClick={handleClickNotBuy}>
                    SIGUIENTE
                  </button>
                )}
              </div>
            </div>
            <div className='pc__columnx'>
              {select === 'Perifericos' ? (
                <div className='pc__periferico'>
                  {buttons.map((btn) => (
                    <button
                      onClick={() => handleFilterPeriferico(btn)}
                      className='pc__btnn'
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              ) : null}
              <div className='pc__right'>
                {complete ? (
                  <div className='pc__complete'>
                    <h2 className='pc__h2'>Components Pc</h2>
                    <ul className='pc__ul'>
                      <div>
                        {armamentPc?.map((product) => (
                          <li className='pc__li' key={product?.product_id}>
                            <span className='pc__span'>
                              {product.product_count}
                            </span>
                            X {product.product_name}
                          </li>
                        ))}
                      </div>
                      <button onClick={handleToCart} className='pc__button'>
                        IR AL CARRITO
                      </button>
                    </ul>
                  </div>
                ) : (
                  <>
                    {productsAcept?.map((product) => (
                      <ArmamentCard
                        key={product.product_id}
                        product={product}
                        handleClickAddComponentPc={handleClickAddComponentPc}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArmamentPc;

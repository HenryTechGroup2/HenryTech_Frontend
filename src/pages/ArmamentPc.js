import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArmamentCard from '../components/AramamentCard/ArmamentCard';
import Header from '../components/Header/Header';
import PCComponetn from '../components/PCComponent/PCComponetn';
import { addProductPC, addToCartProductsArmamentPC } from '../redux/actions';
import { armamentPcImages } from '../utils/helpers';
import { toast, ToastContainer } from 'react-toastify';
const brand = [
  { name: '../assets/amd.png', marca: 'AMD' },
  { name: '../assets/intel.png', marca: 'INTEL' },
];
const ArmamentPc = () => {
  const [select, setSelect] = useState('Procesadores');
  const [complete, setComplete] = useState(false);
  const [selectBrand, setSelectBrand] = useState(null);
  const { products, armamentPc } = useSelector((state) => state);
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
  const productsAcept = products.filter(
    (product) =>
      product?.product_category.toLowerCase() === select.toLocaleLowerCase()
  );
  const handleClickAddComponentPc = (addProduct) => {
    dispatch(addProductPC(addProduct));
  };
  const priceTotal = armamentPc?.reduce(
    (a, b) => a + Number(b.product_price) * b.product_count,
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
          'Motherboard'.toLowerCase() ||
        product.product_category.toLowerCase() === 'Gpu'.toLowerCase() ||
        product.product_category.toLowerCase() === 'Ram'.toLowerCase() ||
        product.product_category.toLowerCase() ===
          'Almacenamiento'.toLowerCase() ||
        product.product_category.toLowerCase() ===
          'Fuente de Poder'.toLowerCase() ||
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
    dispatch(addToCartProductsArmamentPC(armamentPc));
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
                <div className='pc__total'>Total: ${priceTotal}</div>
                {productsCategoryUnique.length >= 6 ? (
                  <button className='pc__buy' onClick={changePageComplete}>
                    To Buy
                  </button>
                ) : (
                  <button className='pc__buy' onClick={handleClickNotBuy}>
                    To Buy
                  </button>
                )}
              </div>
            </div>
            <div className='pc__right'>
              {complete ? (
                <div className='pc__complete'>
                  <h2 className='pc__h2'>Components Pc</h2>
                  <ul className='pc__ul'>
                    <div>
                      {armamentPc?.map((product) => (
                        <li className='pc__li'>
                          <span className='pc__span'>
                            {product.product_count}
                          </span>
                          X {product.product_name}
                        </li>
                      ))}
                    </div>
                    <button onClick={handleToCart} className='pc__button'>
                      To Cart
                    </button>
                  </ul>
                </div>
              ) : (
                productsAcept?.map((product) => (
                  <ArmamentCard
                    product={product}
                    handleClickAddComponentPc={handleClickAddComponentPc}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArmamentPc;

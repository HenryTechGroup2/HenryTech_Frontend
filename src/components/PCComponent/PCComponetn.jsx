import { useState } from 'react';
import { info } from '../../utils/Icons';
import ModalProductsPC from '../ModalProductsPC/ModalProductsPC';

const PCComponetn = ({ image, armamentPc, handleClick, select }) => {
  //Componente para que se vayan cambiando el color de los iconos y de imagenes para armar la PC.
  const [productsPC, setProductsPC] = useState([]);
  const [open, setOpen] = useState(false);

  const image1 = armamentPc?.filter(
    (product) =>
      product.product_category.toLowerCase() === image.img1.name.toLowerCase()
  );
  const image2 =
    image.img2.name === 'Perifericos'
      ? armamentPc?.filter(
          (product) =>
            product.product_category.toLowerCase() === 'teclados' ||
            product.product_category.toLowerCase() === 'mouses' ||
            product.product_category.toLowerCase() === 'auriculares' ||
            product.product_category.toLowerCase() === 'camaras' ||
            product.product_category.toLowerCase() === 'microfonos'
        )
      : armamentPc?.filter(
          (product) =>
            product.product_category.toLowerCase() ===
            image.img2.name.toLowerCase()
        );

  const handleInfoProduct = (evt, product) => {
    evt.stopPropagation();
    setProductsPC(product);
    setOpen(!open);
  };
  const handleClickCloseModal = () => {
    setOpen(!open);
  };
  return (
    <div className='pc__images'>
      {open ? (
        <ModalProductsPC
          product={productsPC}
          open={open}
          handleClick={handleClickCloseModal}
        />
      ) : (
        ''
      )}
      {image1.length <= 0 ? (
        <img
          onClick={() => handleClick(image.img1.name)}
          className={`pc__img ${
            select === image.img1.name ? 'pc__select' : ''
          }`}
          src={image.img1.imagen}
          alt={image.img1.name}
          loading='lazy'
        />
      ) : (
        <div
          className={`pc__div ${
            select === image.img1.name ? 'pc__selec' : ''
          } `}
        >
          <i
            onClick={(evt) => handleInfoProduct(evt, image1)}
            className='pc__i'
          >
            {info}
          </i>
          <img
            onClick={() => handleClick(image.img1.name)}
            className={`pc__img`}
            src={image1[0]?.product_img}
            alt={image.img1.name}
            loading='lazy'
          />
        </div>
      )}
      {image2.length <= 0 ? (
        <img
          onClick={() => handleClick(image.img2.name)}
          className={`pc__img ${
            select === image.img2.name ? 'pc__select' : ''
          }`}
          src={image.img2.imagen}
          alt={image.img2.name}
          loading='lazy'
        />
      ) : (
        <div
          className={`pc__div ${
            select === image.img2.name ? 'pc__selec' : ''
          } `}
        >
          <i
            onClick={(evt) => handleInfoProduct(evt, image2)}
            className='pc__i'
          >
            {info}
          </i>
          <img
            onClick={() => handleClick(image.img2.name)}
            className={`pc__img`}
            src={image2[0]?.product_img}
            alt={image.img2.name}
            loading='lazy'
          />
        </div>
      )}
    </div>
  );
};

export default PCComponetn;

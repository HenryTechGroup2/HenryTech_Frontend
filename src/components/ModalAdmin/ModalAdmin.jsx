import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch } from 'react-redux';
import { ERROR, updateProduct } from '../../redux/actions';
import { close } from '../../utils/Icons';
import ModalLoading from '../ModalLoading/ModalLoading';
import ModalResponse from '../ModalResponse/ModalResponse';
const ModalAdmin = ({ product, open, handleOpenModal }) => {
  const $product = document.getElementById('product');
  const [edit, setEdit] = useState(null);
  const [update, setUpdate] = useState({
    product_ofer: product.product_ofer,
    product_price: product.product_price,
    product_stock: product.stock.stock_amount,
  });
  const [loading, setLoading] = useState(null);
  const [responseBackend, setResponseBacked] = useState(null);
  const dispatch = useDispatch();

  const productModal = [
    {
      title: 'Oferta',
      value: product.product_ofer,
      values: update.product_ofer,
      name: 'product_ofer',
    },
    {
      title: 'Precio',
      value: product.product_price,
      values: update.product_price,
      name: 'product_price',
    },
    {
      title: 'Cantidad',
      value: product.stock.stock_amount,
      values: update.product_stock,
      name: 'product_stock',
    },
  ];
  console.log(update);
  const handleClick = (index) => {
    setEdit(index);
  };
  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;

    setUpdate({
      ...update,
      [name]: value,
    });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newProduct = {
        ...product,
        product_ofer: Boolean(update.product_ofer),
        product_price: String(update.product_price),
        product_stock: update.product_stock,
      };
      setLoading(() => true);
      const res = await dispatch(updateProduct(newProduct, product.product_id));
      setLoading(() => null);
      setResponseBacked(res.payload.msg);
      setTimeout(() => {
        setResponseBacked(null);
      }, 2500);
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.data.response.data,
      });
    }
  };
  const handleChangeOfer = (evt) => {
    const { name, checked } = evt.currentTarget;
    setUpdate({
      ...update,
      [name]: checked,
    });
  };
  return ReactDom.createPortal(
    <div
      className='info'
      style={{
        opacity: `${open ? '1' : '0'}`,
        visibility: `${open ? 'visible' : 'hidden'}`,
      }}
    >
      {loading === null ? null : <ModalLoading />}
      {responseBackend ? (
        <ModalResponse response={responseBackend} yes={''} no={''} />
      ) : null}
      <div className='info__container'>
        <div
          onClick={() => handleOpenModal(false)}
          className='informacion__close'
        >
          {close}
        </div>
        <div className='informacion__name'>{product.product_name}</div>
        <div className='informacion__flex'>
          <div className='informacion__image'>
            <img
              className='informacion__img'
              src={product.product_img}
              alt={product.product_name}
            />
          </div>
          <div className='informacion__info'>
            {productModal.map((item, index) => (
              <div className='informacion__div'>
                <div>
                  <span className='informacion__span'>{item.title}</span>
                  {item.title === 'Oferta' ? (
                    <>
                      {console.log(item.values)}
                      <input
                        type='checkbox'
                        checked={item.values}
                        name={item.name}
                        onChange={handleChangeOfer}
                      />
                    </>
                  ) : edit === index ? (
                    <input
                      className='informacion__input'
                      onChange={handleChange}
                      value={item.values}
                      name={item.name}
                    />
                  ) : (
                    `    ${item.value}`
                  )}
                </div>
                <button
                  onClick={() => handleClick(index)}
                  className='informacion__edit'
                >
                  Editar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='informacion__divs'>
          <button onClick={handleSubmit} className='informacion__update'>
            {' '}
            ACTUALIZAR
          </button>
        </div>
      </div>
    </div>,
    $product
  );
};

export default ModalAdmin;

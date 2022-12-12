import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, ERROR } from '../../redux/actions';
import ModalResponse from '../ModalResponse/ModalResponse';
const btn = ['Pagado', 'Despachado', 'Entregado'];
const CardOrder = ({ order }) => {
  const [view, setView] = useState(null);
  const [status, setStatus] = useState(order.order_status);
  const [responseBackend, setResponseBackend] = useState(null);
  const dispatch = useDispatch();
  const handleEdit = () => {
    if (view === true) return setView(null);
    setView(true);
  };
  const handleClick = async (name) => {
    try {
      const { data } = await axios.put(`${api}/api/order/${order.order_id}`, {
        order_status: name,
      });
      setStatus(name);
      setResponseBackend(data.msg);
      setTimeout(() => {
        setResponseBackend(null);
      }, 1500);
      setView(null);
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
  return (
    <div className='dashp__flex'>
      {responseBackend === null ? null : (
        <ModalResponse response={responseBackend} />
      )}
      <div className='dashp__id'>
        <div className='dashp__check'>
          <input
            type='checkbox'
            // onChange={handleChangeSuspense}
            // checked={suspense ? true : false}
          />
        </div>
        <div className='dashp__number'>{order.order_id}</div>
      </div>
      <div className='dashp__image'>
        {/* <img
      // ${suspense ? 'dashp__suspense' : ''}
        className={`dashp__img `}
        loading='lazy'
        src={product.product_img}
        alt={product.product_name}
      /> */}
      </div>
      <div className='dashp__name'>{order.user.user_email}</div>
      <div className='dashp__ofer'>
        {status}
        {/* {String(ofert) === 'true' ? 'Si' : 'No'} */}
      </div>
      <div className='dashp__button'>
        <button className='dashp__btn' onClick={() => handleEdit()}>
          Editar
        </button>
        {view === null ? null : (
          <div className='dashp__divs'>
            {btn.map((btns) => (
              <button onClick={() => handleClick(btns)} className='dashp__btns'>
                {btns}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className='dashp__delete'>
        {/* <button onClick={handleDeleteProduct} className='dashp__dlt'>
        {deleteProduct}
      </button> */}
      </div>
    </div>
  );
};

export default CardOrder;

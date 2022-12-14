import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, ERROR } from '../../redux/actions';
import AdminLinks from '../AdminLinks/AdminLinks';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CardOrder from './CardOrder';

const AdminOrder = () => {
  const [response, setResponse] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getInvoices = async () => {
      try {
        const { data } = await axios.get(`${api}/api/order`);
        setResponse(data);
      } catch (error) {
        dispatch({
          type: ERROR,
          payload: 'Error linea 21 AdminOrder API',
        });
      }
    };

    getInvoices();
  }, []);
  return (
    <>
      <Header />
      <AdminLinks />
      <div className='order__flex'>
        <div className='dashp__flex'>
          <div className='dashp__id'>ID COMPRA</div>
          <div></div>
          <div className='dashp__ofer'>USUARIO</div>
          <div className='dashp__number state'>ESTADO</div>
          <div className='dashp__button'>EDITAR</div>
        </div>
        {response?.map((order) => (
          <CardOrder order={order} key={order.order_id} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default AdminOrder;

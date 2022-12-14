import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import Graficas from '../components/Graficas/Graficas';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import { api } from '../redux/actions';
import { message } from '../utils/Icons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Productos con mas rating',
    },
  },
};
const enlaces = [
  {
    image: '../assets/product.png',
    name: 'Productos',
    direct: '/admin-products',
  },
  { image: '../assets/user.png', name: 'Usuarios', direct: '/admin-user' },
  {
    image: '../assets/config/invo.png',
    name: 'Ordenes',
    direct: '/admin-orders',
  },
];

const Dashboard = () => {
  const { products } = useSelector((state) => state);
  const productsRating = [...products];
  const labels = productsRating
    .slice(0, 10)
    .map(({ product_name }) => product_name.slice(0, 4));
  let productsViews = productsRating;
  productsViews = productsViews.sort((a, b) => {
    if (a.product_views < b.product_views) {
      return 1;
    }
    if (a.product_views > b.product_views) {
      return -1;
    }
    return 0;
  });
  const productsOfert = [
    {
      product_name: 'Oferta',
      product_count: 0,
    },
    {
      product_name: 'Sin Oferta',
      product_count: 0,
    },
  ];
  products.forEach((product) => {
    if (product.product_ofer) {
      const product = productsOfert.find(
        ({ product_name }) => product_name === 'Sin Oferta'
      );
      product.product_count = product.product_count + 1;
    } else {
      const product = productsOfert.find(
        ({ product_name }) => product_name === 'Oferta'
      );
      product.product_count = product.product_count + 1;
    }
  });
  let orderproducts = productsRating.sort((a, b) => {
    if (a.product_rating < b.product_rating) {
      return 1;
    }
    if (a.product_rating > b.product_rating) {
      return -1;
    } else return 0;
  });
  const data = {
    labels,
    datasets: [
      {
        label: 'Producto',
        data: orderproducts
          .slice(0, 10)
          .map(({ product_rating }) => product_rating),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        color: '#000',
      },
      // {
      //   label: 'Rating',
      //   data: orderproducts
      //     .slice(0, 10)
      //     .map(({ product_rating }) => product_rating),
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      //   color: '#000',
      // },
    ],
  };
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const getInvoices = async () => {
      try {
        const { data } = await axios.get(`${api}/api/order`);
        setResponse(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getInvoices();
  }, []);
  const total =
    response.length > 0
      ? response?.reduce((a, b) => Number(a) + Number(b.order_total), 0)
      : 'Cargando...';
  console.log(response);
  return (
    <>
      <Header />
      <div className='admin'>
        <div className='enlaces'>
          {enlaces.map((item) => (
            <Link
              key={item.name}
              to={item.direct}
              className='enlaces__product enlaces__item'
            >
              <img src={item.image} alt={item.name} className='enlaces__img' />
              {item.name}
            </Link>
          ))}
        </div>
        <div className='dashboard'>
          <div className='dashboard__graph'>
            <Bar options={options} data={data} />
          </div>
          <div className='dashboard__total'>
            <div className='dashboard__mon'>
              <div>Ganancias</div>{' '}
              <img className='enlaces__img2' src='../assets/mon.png' alt='' />
            </div>
            <div className='dashboard__ganancias'>
              <div className='dashboard__ganancia'>ID DE ORDEN</div>
              <div className='dashboard__ganancia2'>COSTO</div>
              {response?.map((count) => (
                <>
                  <div className='dashboard__ganancia'>{count.order_id}</div>
                  <div className='dashboard__ganancia2'>
                    {Number(count.order_total).toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                    })}
                  </div>
                </>
              ))}
              <div className='dashboard__ganancia'>TOTAL</div>
              <div className='dashboard__ganancia2'>
                {Number(total).toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='dashboard__two'>
          <Graficas
            products={productsViews}
            titleG={'Productos mas vistos'}
            cls={'2'}
          />
          <Graficas
            products={productsOfert}
            titleG={'Productos en Oferta'}
            cls={'3'}
            filtr={true}
          />
        </div>
        <div className='home__msg dashboard__message'>
          <Link to={'/admin-messages'}>{message}</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

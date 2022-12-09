import React from 'react';
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
      text: 'Productos mas vendidos',
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
    .map(({ product_name }) => product_name.slice(0, 20));

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
      {
        label: 'Rating',
        data: orderproducts
          .slice(0, 10)
          .map(({ product_rating }) => product_rating),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        color: '#000',
      },
    ],
  };
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
          <div className='dashboard__total'>Ganancias</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from 'react';
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graficas = ({ products, titleG, cls, filtr }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${titleG}`,
      },
    },
  };
  const data = {
    labels: products
      .slice(0, 10)
      .map(({ product_name }) => product_name.slice(0, 4)),
    datasets: [
      {
        label: 'Producto',
        data: filtr
          ? products.slice(0, 2).map(({ product_count }) => product_count)
          : products
              .sort((a, b) => {
                if (a.product_views < b.product_views) {
                  return 1;
                }
                if (a.product_views > b.product_views) {
                  return -1;
                }
                return 0;
              })
              .map(({ product_views }) => product_views),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        color: '#000',
      },
    ],
  };
  return (
    <div className={`dashboard__item${cls} dashboard__graph`}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Graficas;

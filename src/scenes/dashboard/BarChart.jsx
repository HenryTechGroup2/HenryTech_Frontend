import React, { useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../redux/actions.js';

export function BarChart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews())
  }, []);
  const reviews = useSelector((state) => state.reviews);

  // const reviews = [
  //   {
  //     id: 1,
  //     review_title: "Mal estado",
  //     review_body: "El producto me llego todo roto XD",
  //     review_score: 2,
  //     review_product: 1,
  //     review_user_id: 1
  //   },
  //   {
  //     id: 2,
  //     review_title: "Buen estado",
  //     review_body: "El producto me llego en buen estado",
  //     review_score: 3,
  //     review_product: 2,
  //     review_user_id: 2
  //   },
  //   {
  //     id: 3,
  //     review_title: "Envio",
  //     review_body: "La compra me llogo super rapido y en perfecto estado",
  //     review_score: 5,
  //     review_product: 2,
  //     review_user_id: 5
  //   },
  //   {
  //     id: 4,
  //     review_title: "Es una cagada",
  //     review_body: "asdasdasdasdasd",
  //     review_score: 1,
  //     review_product: 3,
  //     review_user_id: 7
  //   },
  //   {
  //     id: 5,
  //     review_title: "Es una cagada",
  //     review_body: "asdasdasdasdasd",
  //     review_score: 4,
  //     review_product: 6,
  //     review_user_id: 7
  //   },
  //   {
  //     id: 6,
  //     review_title: "Es una cagada",
  //     review_body: "asdasdasdasdasd",
  //     review_score: 2,
  //     review_product: 8,
  //     review_user_id: 7
  //   }
  // ]

  const array = [];
  const reviewsdata = [];
  reviews?.forEach((e) => {
    if (!array.includes(e.review_product)) {
      array.push(e.review_product);
    }
  });
  array?.forEach((e) => {
    reviewsdata.push({
      producto: e,
      score: [],
    });
  });
  reviews?.forEach((e) => {
    reviewsdata.forEach((a) => {
      if (a.producto === e.review_product) {
        a.score.push(e.review_score);
      }
    });
  });
  reviewsdata?.forEach((e) => {
    let long = e.score.length;
    let sum = e.score.reduce((previous, current) => (current += previous));
    e.score = sum / long;
  });

  //console.log(reviewsdata)

  if (reviews.length > 0) {
    return (
      <div style={{ height: 300, width: '100%' }}>
        <ResponsiveBar
          data={reviewsdata}
          keys={['score']}
          indexBy='producto'
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.1}
          valueScale={{ type: 'linear' }}
          colors='#7eda55'
          animate={true}
          enableLabel={true}
          axisBottom={{
            tickSize: 5,
            tickPadding: 10,
            legend: 'ProductoId',
            legendPosition: 'middle',
          }}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Puntuación',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
        />
      </div>
    );
  }
}
export default BarChart;

import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../redux/actions.js';

//Users, products, invoice, reviews
export function Reviews() {
  const columns = [
    { field: 'review_id', headerName: 'ID' },
    { field: 'review_title', headerName: 'Título', flex: 1 },
    { field: 'review_body', headerName: 'Descripción' },
    { field: 'review_score', headerName: 'Puntuación' },
    { field: 'review_product', headerName: 'Producto' },
    { field: 'review_user_id', headerName: 'Usuario' },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews())
  }, []);
  const reviews = useSelector((state) => state.reviews);


  if (reviews.length === 0) {
    return (<div className='loader'>
      <div className='spinner'></div>
    </div>)
  }
  else return (
    <div>
      <h1>RESEÑAS</h1>
      <div>
        <div style={{ height: 450, width: '100%' }}>
          <DataGrid
            checkboxSelection
            getRowId={(row) => row.review_id}
            rows={reviews}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
}

export default Reviews;

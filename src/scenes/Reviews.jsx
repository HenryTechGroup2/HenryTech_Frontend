import React, { useEffect, useState} from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, deleteReview } from '../redux/actions.js';

//Users, products, invoice, reviews
export function Reviews() {

  const [pageSize, setPageSize] = useState(5);

  const columns = [
    { field: 'review_id', headerName: 'ID' },
    { field: 'review_title', headerName: 'Título', flex: 1 },
    { field: 'review_body', headerName: 'Descripción' },
    { field: 'review_score', headerName: 'Puntuación' },
    { field: 'review_product', headerName: 'Producto' },
    { field: 'review_user_id', headerName: 'Usuario' },
    {
      field: "Eliminar",
      renderCell: (cellValues) => {
          return (
              <button onClick={(e) => {
                  handleOnDelete(e, cellValues)
              }}>Eliminar</button>
          )
      }
  }
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews())
  }, []);
  const reviews = useSelector((state) => state.reviews);

  const handleOnDelete = (e, cellValues) => {
    dispatch(deleteReview(cellValues.row.review_id))
    alert(`La reseña ${cellValues.row.review_id} fue eliminado con éxito`)
    // navigate('/admin/product')
}

const handleCellClick = (param, e) => {
  e.stopPropagation();
}
const handleRowClick = (param, e) => {
  e.stopPropagation();
}

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
            components={{ Toolbar: GridToolbar }}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                    sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: "#7eda55",
                        },
                        color: "white",
                        weigth: "80%",
                        marginLeft: "20%",
                    }}
          />
        </div>
      </div>
    </div>
  );
}

export default Reviews;

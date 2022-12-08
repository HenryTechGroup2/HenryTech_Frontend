import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from '../redux/actions.js';
// import { mockDataUsers } from "../data/mockData";
import {Link} from 'react-router-dom'

//Users, products, invoice, reviews
export function Users() {

  const [pageSize, setPageSize] = useState(5);

  const columns = [
    { field: 'user_id', headerName: 'ID' },
    { field: 'user_email', headerName: 'Email', flex: 1 },
    { field: 'user_name', headerName: 'Nombre' },
    { field: 'user_phone', headerName: 'Telefono' },
    { field: 'user_shipping_address', headerName: 'Dirección' },
    { field: 'user_isAdmin', headerName: 'Es administrador' },
    { field: 'user_favorites', headerName: 'Productos favoritos' },
    {
      field: "Eliminar",
      renderCell: (cellValues) => {
          return (
              <button onClick={(e) => {
                  handleOnDelete(e, cellValues)
              }}>Eliminar</button>
          )
      }
  },
  {
    field: "Editar",
    renderCell: (cellValues) => {
        return (
            <Link to={`/admin/users/editarusuario/${cellValues.row.user_id}`}>
            <button onClick={(e) => handleOnClick(e, cellValues)}>Editar</button>
             </Link>  
        )
    }
}
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers())
  }, []);
  const { users } = useSelector((state) => state);

  const handleOnDelete = (e, cellValues) => {
    dispatch(deleteUser(cellValues.row.user_id))
    alert(`El usuario ${cellValues.row.user_id} fue eliminado con éxito`)
}

const handleCellClick = (param, e) => {
  e.stopPropagation();
}
const handleRowClick = (param, e) => {
  e.stopPropagation();
}
const handleOnClick = (e, cellValues) => {
  console.log(cellValues)
}

  if (users.length === 0) {
    return (<div className='loader'>
      <div className='spinner'></div>
    </div>)
  }
  else return (
    <div>
      <h1>USUARIOS REGISTRADOS</h1>
      <div style={{ height: 450, width: '100%' }}>
        <DataGrid
          checkboxSelection
          getRowId={(row) => row.user_id}
          rows={users}
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
  );

}

export default Users;

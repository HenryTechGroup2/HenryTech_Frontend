import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actions.js';
// import { mockDataUsers } from "../data/mockData";

//Users, products, invoice, reviews
export function Users() {
  const columns = [
    { field: 'user_id', headerName: 'ID' },
    { field: 'user_email', headerName: 'Email', flex: 1 },
    { field: 'user_name', headerName: 'Nombre' },
    { field: 'user_phone', headerName: 'Telefono' },
    { field: 'user_shipping_address', headerName: 'Dirección' },
    { field: 'user_isAdmin', headerName: 'Es administrador' },
    { field: 'user_favorites', headerName: 'Productos favoritos' },
  ];


  const dispatch = useDispatch();
  useEffect(() => dispatch(getUsers()), []);
  const { users } = useSelector((state) => state);

  return (
    <div>
      {users?.length > 0 ? (
        <>
          <h1>USUARIOS REGISTRADOS</h1>
          <div style={{ height: 450, width: '100%' }}>
            <DataGrid
              checkboxSelection
              getRowId={(row) => row.user_id}
              rows={users}
              columns={columns}
            />
          </div>
        </>
      ) : null}
    </div>
  );

}

export default Users;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsers, getUsers } from '../../redux/actions';
import AdminLinks from '../AdminLinks/AdminLinks';
import Header from '../Header/Header';
import OneUser from './OneUser';

const AdminUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    return () => {
      dispatch(deleteUsers());
    };
  }, []);
  const { users } = useSelector((state) => state);
  console.log(users);
  return (
    <>
      <Header />
      <AdminLinks />

      <div className='dashp'>
        <div className='dashp__contain'>
          <div className='dashp__flex'>
            <div className='dashp__id'>ID</div>
            <div></div>
            <div className='dashp__name'>Correo del Usuario</div>
            <div className='dashp__ofer'>Nombre</div>
            <div>Admin</div>
          </div>
          {users.slice(0, 10).map((user) => (
            <OneUser key={user.user_id} user={user} />
          ))}
        </div>
        <div>{/* <button onClick={moreProducts}>Ver Mas</button> */}</div>
      </div>
    </>
  );
};

export default AdminUser;

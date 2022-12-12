import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminLinks = () => {
  const [select, setSelect] = useState(null);
  const links = [
    { name: 'Usuarios', direccion: '/admin-user' },
    { name: 'Products', direccion: '/admin-products' },
    { name: 'Ordenes', direccion: '/admin-orders' },
  ];
  const handleClick = (index) =>
    index === select ? setSelect(null) : setSelect(index);
  return (
    <div className='admin__links'>
      {links.map((item, index) => (
        <Link
          onClick={handleClick}
          className={`${index === select ? 'admin__select' : null}`}
          to={item.direccion}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default AdminLinks;

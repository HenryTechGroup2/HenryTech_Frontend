import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { favorit, notFavorit } from '../../utils/Icons';

const ButtonFavorite = ({ product }) => {
  const [favoritState, setFavoritState] = useState(false);
  const { userDates } = useSelector((state) => state);
  const handleAddFavorit = async (evt) => {
    evt.stopPropagation();
    setFavoritState(!favoritState);
    const data = await axios.post('http://localhost:3001/api/favorite', {
      user_id: userDates.user_id,
      product_id: product.product_id,
    });
    console.log(data);
  };
  console.log(product?.product_favorite);
  return (
    <button
      className='product__btn'
      disabled={userDates.hasOwnProperty('user_name') ? false : true}
      onClick={handleAddFavorit}
    >
      {favoritState || product?.product_favorite === true
        ? favorit
        : notFavorit}
    </button>
  );
};

export default ButtonFavorite;

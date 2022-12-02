import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_FAVORIT, DELETE_FAVORIT } from '../../redux/actions';
import { favorit, notFavorit } from '../../utils/Icons';

const ButtonFavorite = ({ product }) => {
  const [favoritState, setFavoritState] = useState(product?.product_favorite);
  const { userDates } = useSelector((state) => state);
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleAddFavorit = async (evt) => {
    evt.stopPropagation();
    setFavoritState(!favoritState);
    if (product?.product_favorite === true) {
      console.log(userDates.user_id, product.product_id);
      await axios.delete(
        `http://localhost:3001/api/favorite/${userDates.user_id}/${product.product_id}`
      );
      return dispatch({ type: DELETE_FAVORIT, payload: product.product_id });
    }
    const data = await axios.post('http://localhost:3001/api/favorite', {
      user_id: userDates.user_id,
      product_id: product.product_id,
    });
    dispatch({ type: ADD_FAVORIT, payload: product.product_id });
  };
  useEffect(() => {
    setFavoritState(product?.product_favorite);
  }, [product?.product_favorite, state]);

  console.log(product);
  return (
    <button
      className='product__btn'
      disabled={userDates.hasOwnProperty('user_name') ? false : true}
      onClick={handleAddFavorit}
    >
      {favoritState === true ? favorit : notFavorit}
    </button>
  );
};

export default ButtonFavorite;

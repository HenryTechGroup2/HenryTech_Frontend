import axios from 'axios';
export const CREATE_USER = '@user/create';
export function getAllProducts() {
  try {
    return async function (dispatch) {
      const result = await axios.get('http://localhost:3003/api/product');
      return dispatch({
        type: 'GET_PRODUCTS',
        payload: result.data,
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
export function createUser(user) {
  return {
    type: CREATE_USER,
    payload: user,
  };
}
//Llamar al stock de productos
export function getStockProducts() {
  try {
    return async function (dispatch) {
      const result = await axios.get('https://fakestoreapi.com/getstock');
      return dispatch({
        type: 'GET_STOCK_PRODUCTS',
        payload: result.data,
      });
    };
  } catch (error) {}
}

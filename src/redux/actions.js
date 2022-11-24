
import axios from 'axios';

export function getAllProducts() {
  try {
    return async function (dispatch) {
      const result = await axios.get('https://fakestoreapi.com/products');
      return dispatch({
        type: 'GET_PRODUCTS',
        payload: result.data,
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
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

import axios from 'axios'


export function productByname(title) {
    try {
        return async function (dispatch) {
            let productName = await axios(`https://fakestoreapi.com/products?title=${title}`)
           // console.log(productName.data)
            return dispatch({
                type: 'PRODUCT_BY_NAME',
                payload: productName.data
            })
        }
    } catch (e) {
        throw new Error(e)
    }
}

export function filterByPirce (product_price) {
    return ({
        type: 'FILTER_BY_PRICE',
        payload: product_price
    })
}

export function filterByCategory (product_category) {
    return ({
        type: 'FILTER_BY_CATEGORY',
        payload: product_category
    })
}

export function filterByBrand () {}

export function orderByPrice () {}

export function orderByPopularity () {} 


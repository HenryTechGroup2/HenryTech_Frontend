import axios from 'axios';
export const CREATE_USER = '@user/create';
export const DELETE_DETAILS = '@detail/delete';
export const CAR_MODIFIER = '@car/modifier';
export const FILTER_SEARCH = '@filter/search';
export const PAGES_HOME = '@pages/home';
export const ADD_FAVORIT = '@favorit/add';
export const USER_CLOSE = '@user/close';
export const ADD_CART_LOCAL_STORAGE = '@car/storage';
export const ARMAMENT_PC_PRODUCT = '@armament/product';
export const ADD_TO_CART_PC = '@armament/cart-product';
export const api = 'https://henry-tech-backend.vercel.app';
export function getAllProducts() {
  return async function (dispatch) {
    try {
      const result = await axios.get(`${api}/api/product`);
      return dispatch({
        type: 'GET_PRODUCTS',
        payload: result.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
export function createUser(user) {
  return {
    type: CREATE_USER,
    payload: user,
  };
}
//Llamar al stock de productos
export function getStockProducts() {
  return async function (dispatch) {
    try {
      const result = await axios.get('https://fakestoreapi.com/getstock');
      return dispatch({
        type: 'GET_STOCK_PRODUCTS',
        payload: result.data,
      });
    } catch (error) {}
  };
}

export function getDetailsProducts(id) {
  try {
    return async function (dispatch) {
      const result = await axios.get(`${api}/api/product/${id}`);
      return dispatch({
        type: 'GET_DETAILS_PRODUCTS',
        payload: result.data,
      });
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
export function postCreateReview(payload) {
  return async function (dispatch) {
    try {
      const result4 = await axios.post(
        '`https://fakestoreapi.com/products/',
        payload
      );
      return dispatch({
        type: 'POST_CREATE_REVIEW',
        payload: result4.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
export function productByname(title) {
  return async function (dispatch) {
    try {
      let productName = await axios(
        `https://fakestoreapi.com/products?title=${title}`
      );
      return dispatch({
        type: 'PRODUCT_BY_NAME',
        payload: productName.data,
      });
    } catch (e) {
      throw new Error(e);
    }
  };
}

export function filters(payload) {
  return {
    type: 'FILTERS',
    payload: payload,
  };
}

export function orderByPrice(orderprice) {
  return {
    type: 'ORDER_BY_PRICE',
    payload: orderprice,
  };
}

export function orderByRating(orderrating) {
  return {
    type: 'ORDER_BY_RATING',
    payload: orderrating,
  };
}

export function filterByPirce(product_price) {
  return {
    type: 'FILTER_BY_PRICE',
    payload: product_price,
  };
}

export function filterByCategory(product_category) {
  return {
    type: 'FILTER_BY_CATEGORY',
    payload: product_category,
  };
}
// Filters
export function filterSearch(value) {
  return {
    type: FILTER_SEARCH,
    payload: value,
  };
}
export function pageHome() {
  return {
    type: PAGES_HOME,
  };
}
export function closeSession() {
  return {
    type: USER_CLOSE,
  };
}
export function addProductPC(product) {
  return {
    type: ARMAMENT_PC_PRODUCT,
    payload: product,
  };
}
export function deleteDetailsProducts() {
  return {
    type: DELETE_DETAILS,
  };
}
export function filterByBrand() {}

export function orderByPopularity() {}

export function addToCartProductsArmamentPC(products) {
  return {
    type: ADD_TO_CART_PC,
    payload: products,
  };
}



export function getUser(id) {
  try {
    return async function (dispatch) {
      const result = await axios.get(`http://localhost:3001/api/user/${id}`);
      return dispatch({
        type: 'GET_USER',
        payload: result.data,
      });
    };
  } catch (error) {
    throw new Error(error.message)
  }
}

export function updateUser(payload, id){
  try {
    return async function(dispatch){
      const result = await axios.put(`http://localhost:3001/api/user/${id}`,payload)
      return dispatch({
          type: "PUT_UPDATE_USER",
          payload: result.data
      })
  }
  } catch (error) {
    throw new Error(error.message)
  }
}


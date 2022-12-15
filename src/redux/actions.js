import axios from 'axios';
export const CREATE_USER = '@user/create';
export const DELETE_USERS = '@users/delete';
export const DELETE_DETAILS = '@detail/delete';
export const CAR_MODIFIER = '@car/modifier';
export const FILTER_SEARCH = '@filter/search';
export const PAGES_HOME = '@pages/home';
export const ADD_FAVORIT = '@favorit/add';
export const USER_CLOSE = '@user/close';
export const ADD_CART_LOCAL_STORAGE = '@car/storage';
export const ARMAMENT_PC_PRODUCT = '@armament/product';
export const ADD_TO_CART_PC = '@armament/cart-product';
export const DELETE_PC_PRODUCT = '@armament/delete';
export const LOGIN_USER = '@user/login';
export const ADD_ALL_FAVORITES = '@user/add-favorites';
export const ADD_REVIEW_PRODUCT_REAL_TIME = '@review/add-real-time';
export const CHANGE_ID_USER = '@user/changeId';
export const DELETE_FAVORIT = '@favorit/delete';
export const FILTER_STAR = '@filter/star';
export const CREATE_USER_AUTH0 = '@user/auth0';
export const DELETE_CART = 'cart/delete-all';
export const ORDER_VIEWS = '@order/views';
export const SELECT_ORDER = '@order/select';
export const CHANGE_PASSWORD = '@change/password';
export const ERROR = '@error';
export const BIENVENIDO = '@bienvenido';
export const WIDTH = '@width';
export const MESSAGE = '@message/message';
export const MSG = '@message/msg';
export const MSG_ADMIN = '@message/msg-admin';
export const MESSAGE_ADMIN = '@message/message-admin';
export const USER_ALL_MSG = '@message/user-all-msg';
export const MESSAGE_USER = '@message/user-all-admin';
export const CHANGE_USER = '@message/change-user';
export const MESSAGE_USER_POST = '@message/message-user-post';
export const MSG_RECEIVED_INPUT = '@message/message-input';
export const HOVER = '@hover';
export const api = 'https://backend-tech.vercel.app';
// export const api = 'http://localhost:3001';
//ORDER
export function orderSelect(order) {
  return {
    type: SELECT_ORDER,
    payload: order,
  };
}
export function newMessageSocket(msg) {
  return {
    type: MESSAGE,
    payload: msg,
  };
}
export function getAllProducts() {
  return async function (dispatch) {
    try {
      const result = await axios.get(`${api}/api/product`);
      return dispatch({
        type: 'GET_PRODUCTS',
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}
export function createUser(user) {
  return {
    type: CREATE_USER,
    payload: user,
  };
}
export function getDetailsProducts(id) {
  return async function (dispatch) {
    try {
      const result = await axios.get(`${api}/api/product/${id}`);
      return dispatch({
        type: 'GET_DETAILS_PRODUCTS',
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
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
      dispatch({
        type: ERROR,
        payload: error,
      });
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
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
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

export function addToCartProductsArmamentPC(products, price) {
  return {
    type: ADD_TO_CART_PC,
    payload: {
      products,
      price,
    },
  };
}
export function deleteProductArmamentPC(id) {
  return {
    type: DELETE_PC_PRODUCT,
    payload: id,
  };
}

export function getUser(id) {
  return async function (dispatch) {
    try {
      const result = await axios.get(`${api}/api/user/${id}`);
      return dispatch({
        type: 'GET_USER',
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}

export function updateUser(payload, id, password) {
  return async function (dispatch) {
    try {
      const result = await axios.put(`${api}/api/user/${id}`, payload);
      return dispatch({
        type: 'PUT_UPDATE_USER',
        payload: { data: result.data, password },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.msg,
      });
    }
  };
}

export function filterByRaiting(product_raiting) {
  return {
    type: 'FILTER_BY_RAITING',
    payload: product_raiting,
  };
}

export function postCreateProduct(payload) {
  return async function (dispatch) {
    try {
      const result = await axios.post(`${api}/api/product`, payload);
      return dispatch({
        type: 'POST_CREATE_PRODUCT',
        payload: result.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.data.response.data,
      });
    }
  };
}

export function getUsers() {
  return async function (dispatch) {
    try {
      const result = await axios.get(`${api}/api/user`);
      return dispatch({
        type: 'GET_USERS',
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}
export function getInvoice() {
  return async function (dispatch) {
    try {
      const result = await axios.get(`${api}/api/invoice`);
      return dispatch({
        type: 'GET_INVOICE',
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}

export function getReviews() {
  return async function (dispatch) {
    try {
      const result = await axios.get(`${api}/api/review`);
      return dispatch({
        type: 'GET_REVIEWS',
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}

export function updateProduct(payload, id) {
  return async function (dispatch) {
    try {
      const result = await axios.put(`${api}/api/product/${id}`, payload);
      return dispatch({
        type: 'PUT_UPDATE_PRODUCT',
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}
export function sendMail(emails) {
  return async function (dispatch) {
    try {
      const result = await axios.post(`${api}/api/send-email`, emails);
      return dispatch({
        type: BIENVENIDO,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}
//TODO TERMINAR HOY
export function sendMailCar(emails) {
  return async function (dispatch) {
    try {
      const result = await axios.post(`${api}/api/cart-email`, emails);
      return dispatch({
        type: BIENVENIDO,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}
export function deleteUsers() {
  return {
    type: DELETE_USERS,
  };
}

import axios from 'axios';
export const CREATE_USER = '@user/create';
export function getAllProducts() {
  try {
    return async function (dispatch) {
      const result = await axios.get('http://localhost:3001/api/product');
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
  } catch (error) { }
}

export function getDetailsProducts(id) {
  try {
    return async function (dispatch) {

      const result = await axios.get(`http://localhost:3001/api/product/${id}`)
      return dispatch({
        type: "GET_DETAILS_PRODUCTS",
        payload: result.data
      })
    }
  } catch (error) {
    throw new Error(error.message)

      const result = await axios.get(`http://localhost:3001/api/product/${id}`);
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
  try {
    return async function (dispatch) {

      const result4 = await axios.post("`https://fakestoreapi.com/products/", payload)
      return dispatch({
        type: "POST_CREATE_REVIEW",
        payload: result4.data
      })
    }
  } catch (error) {
    throw new Error(error.message)

      const result4 = await axios.post(
        '`https://fakestoreapi.com/products/',
        payload
      );
      return dispatch({
        type: 'POST_CREATE_REVIEW',
        payload: result4.data,
      });
    };
  } catch (error) {
    throw new Error(error.message);

  }
}

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

export function filters (payload) {
  return ({
      type: 'FILTERS',
      payload: payload
  })
}

export function orderByPrice (orderprice) {
  return ({
      type: "ORDER_BY_PRICE",
      payload: orderprice
  })
}

export function orderByRating (orderrating) {
  return({
      type: "ORDER_BY_RATING",
      payload: orderrating
  })
} 

      let productName = await axios(
        `https://fakestoreapi.com/products?title=${title}`
      );
      // console.log(productName.data)
      return dispatch({
        type: 'PRODUCT_BY_NAME',
        payload: productName.data,
      });
    };
  } catch (e) {
    throw new Error(e);
  }
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

export function filterByBrand() {}


export function orderByPrice() {}

export function orderByPopularity() {}

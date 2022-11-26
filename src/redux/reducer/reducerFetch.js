import { CAR_MODIFIER, CREATE_USER, DELETE_DETAILS } from '../actions';
import { ADD_TO_CART, DELETE_TO_CAR } from '../actionsCar';
import { USER } from '../storage/variables';

const initialState = {
  products: [],
  userlogin: false,
  userDates: {},
  car: [],
  productIdCar: 1,
  copieProducts: [],
  detailsProduct: {},
  reviews: [],
  priceTotal: 0,
};

export const reducerFetch = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS': {
      return {
        ...state,
        products: action.payload,
        copieProducts: action.payload,
      };
    }
    case 'GET_DETAILS_PRODUCTS': {
      console.log(action.payload);
      return {
        ...state,
        detailsProduct: action.payload,
      };
    }
    case 'POST_CREATE_REVIEW': {
      return {
        ...state,
        reviews: [...state.reviews, { ...action.payload }],
      };
    }
    case 'GET_STOCK_PRODUCTS': {
      return {
        ...state,
        stockProducts: action.payload,
      };
    }
    case CREATE_USER: {
      console.log(action.payload);
      window.localStorage.setItem(USER, JSON.stringify([action.payload]));
      return {
        ...state,
        userDates: action.payload,
        userlogin: true,
      };
    }
    case ADD_TO_CART: {
      const newProductCar = {
        ...action.payload.product,
        product_count: action.payload.count,
      };
      state = {
        ...state,
        car: [...state.car, newProductCar],
        productIdCar: state.productIdCar + 1,
      };
      const priceTotal = state.car.reduce(
        (a, b) => Number(a) + Number(b.product_price) * b.product_count,
        0
      );
      return {
        ...state,
        priceTotal,
      };
    }
    case DELETE_TO_CAR: {
      const products = state.car.filter(
        (product) => product.idCar !== action.payload
      );
      console.log(products);
      return {
        ...state,
        car: products,
      };
    }
    case 'PRODUCT_BY_NAME':
      return {
        ...state,
        products: action.payload,
      };
    case 'FILTER_BY_PRICE': {
      let filterproducts = state.copieProducts.filter(
        (e) => e.product_price <= action.payload
      );
      return {
        ...state,
        products: filterproducts,
      };
    }
    case DELETE_DETAILS: {
      return {
        ...state,
        detailsProduct: {},
      };
    }
    case CAR_MODIFIER: {
      const order = [...state.car];
      const produc = order.find(
        (product) => product.product_id === action.payload.product.product_id
      );
      produc.product_count = action.payload.count;
      state = {
        ...state,
      };
      if (action.payload.add === true) {
        return {
          ...state,
          priceTotal: Number(state.priceTotal) + Number(produc.product_price),
        };
      }
      return {
        ...state,
        priceTotal: Number(state.priceTotal) - Number(produc.product_price),
      };
    }
    default:
      return { ...state };
  }
};

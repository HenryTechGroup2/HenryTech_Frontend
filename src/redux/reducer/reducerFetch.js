import {
  CAR_MODIFIER,
  CREATE_USER,
  DELETE_DETAILS,
  FILTER_SEARCH,
  PAGES_HOME,
} from '../actions';
import { ADD_TO_CART, DELETE_TO_CAR } from '../actionsCar';
import { CAR, USER } from '../storage/variables';

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
  viewHome: false,
  filters: {
    search: '',
  },
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
      window.localStorage.setItem(CAR, JSON.stringify(state.car));
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
        (product) => product.product_id !== action.payload.id
      );

      state = {
        ...state,
        car: products,
        priceTotal: state.priceTotal - action.payload.price,
      };
      window.localStorage.setItem(CAR, JSON.stringify(state.car));
      return state;
    }
    case FILTER_SEARCH: {
      const resultSearch = state.products.filter(
        (product) =>
          product.product_name
            .toLowerCase()
            .indexOf(action.payload.toLowerCase()) !== -1
      );
      return {
        ...state,
        copieProducts: resultSearch,
        filters: {
          ...state.filters,
          search: action.payload,
        },
        viewHome: true,
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
      return state;
    }
    case 'FILTERS': {
      let filterproducts = [];
      state.copieProducts.forEach((e) => {
        if (
          action.payload.category.length > 0 &&
          action.payload.brand.length > 0
        ) {
          if (
            action.payload.category.includes(e.product_category) &&
            action.payload.brand.includes(e.product_brand) &&
            e.product_price <= action.payload.price
          ) {
            filterproducts.push(e);
          }
        } else if (action.payload.category.length > 0) {
          if (
            action.payload.category.includes(e.product_category) &&
            e.product_price <= action.payload.price
          ) {
            filterproducts.push(e);
          }
        } else if (action.payload.brand.length > 0) {
          if (
            action.payload.brand.includes(e.product_brand) &&
            e.product_price <= action.payload.price
          ) {
            filterproducts.push(e);
          }
        } else if (e.product_price <= action.payload.price) {
          filterproducts.push(e);
        }
      });

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
    case 'ORDER_BY_PRICE': {
      if (action.payload === 'price max-min') {
        let orderproducts = state.products.sort((a, b) => {
          if (a.product_price < b.product_price) {
            return 1;
          }
          if (a.product_price > b.product_price) {
            return -1;
          } else return 0;
        });
        return {
          ...state,
          products: orderproducts,
        };
      }

      if (action.payload === 'price min-max') {
        let orderproducts = state.products.sort((a, b) => {
          if (a.product_price < b.product_price) {
            return -1;
          }
          if (a.product_price > b.product_price) {
            return 1;
          } else return 0;
        });
        return {
          ...state,
          products: orderproducts,
        };
      }
      return state;
    }
    case 'ORDER_BY_RATING': {
      if (action.payload === 'rating max-min') {
        let orderproducts = state.products.sort((a, b) => {
          if (a.product_rating < b.product_rating) {
            return 1;
          }
          if (a.product_rating > b.product_rating) {
            return -1;
          } else return 0;
        });
        return {
          ...state,
          products: orderproducts,
        };
      }

      if (action.payload === 'rating min-max') {
        let orderproducts = state.products.sort((a, b) => {
          if (a.product_rating < b.product_rating) {
            return -1;
          }
          if (a.product_rating > b.product_rating) {
            return 1;
          } else return 0;
        });
        return {
          ...state,
          products: orderproducts,
        };
      }
      return state;
    }
    //PAGES
    case PAGES_HOME: {
      return {
        ...state,
        viewHome: false,
        filters: {
          ...state.filters,
          search: '',
        },
      };
    }
    default:
      return state;
  }
};

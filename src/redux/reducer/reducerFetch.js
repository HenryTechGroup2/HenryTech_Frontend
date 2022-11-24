import { CREATE_USER } from '../actions';
import { USER } from '../storage/variables';

const initialState = {
  products: [],
  userlogin: false,
  userDates: {},
  stockProducts: [
    {
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      stock: 10,
    },
    { title: 'Mens Casual Premium Slim Fit T-Shirts ', stock: 35 },
    { title: 'Mens Cotton Jacket', stock: 4 },
  ],
};

export const reducerFetch = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS': {
      return {
        ...state,
        products: action.payload,
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
      };
    }
    default:
      return state;
  }
};

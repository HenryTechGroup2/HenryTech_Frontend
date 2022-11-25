import { CREATE_USER } from '../actions';
import { ADD_TO_CART, DELETE_TO_CAR } from '../actionsCar';
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
  car: [],
  productIdCar: 1,
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
        userlogin: true,
      };
    }
    case ADD_TO_CART: {
      const newProductCar = {
        ...action.payload,
        idCar: state.productIdCar,
      };
      return {
        ...state,
        car: [...state.car, newProductCar],
        productIdCar: state.productIdCar + 1,
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
    default:
      return state;
  }
};

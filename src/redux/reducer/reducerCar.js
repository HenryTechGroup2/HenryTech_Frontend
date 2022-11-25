import { ADD_TO_CART, DELETE_TO_CAR } from '../actionsCar';

const INITIAL_STATE = {
  car: [],
  productIdCar: 1,
};
const reducerCar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
export default reducerCar;

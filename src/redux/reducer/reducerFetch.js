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

  copieProducts:[],
  detailsProduct:[],
  reviews: []

};


export const reducerFetch = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS": {

      return {
        ...state,
        products: action.payload,
        copieProducts: action.payload
      };
    }
    case "GET_DETAILS_PRODUCTS":{
      return {
        ...state,
        detailsProduct: action.payload
      }
    }
    case "POST_CREATE_REVIEW":{
      return{
        ...state,
        reviews: [...state.reviews, {...action.payload}]
      }
    }
    case "GET_STOCK_PRODUCTS": {

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
    
    case 'PRODUCT_BY_NAME': return {
      ...state,
      products: action.payload
    }

    case 'FILTERS': {
      let filterproducts = []
      state.copieProducts.forEach(e => {
        if (action.payload.category.length > 0 && action.payload.brand.length > 0) {
          if (action.payload.category.includes(e.product_category) && action.payload.brand.includes(e.product_brand) && e.product_price <= action.payload.price) {
            filterproducts.push(e)
          }
        }
        else if (action.payload.category.length > 0) {
          if (action.payload.category.includes(e.product_category) && e.product_price <= action.payload.price) {
            filterproducts.push(e)
          }
        }
        else if (action.payload.brand.length > 0) {
          if (action.payload.brand.includes(e.product_brand) && e.product_price <= action.payload.price) {
            filterproducts.push(e)
          }
        }
        else if (e.product_price <= action.payload.price) {
          filterproducts.push(e)
        }
      })
      return {
        ...state,
        products: filterproducts
      }
    }

    case "ORDER_BY_PRICE": {
      if (action.payload === 'price max-min') {
        let orderproducts = state.products.sort((a, b) => {
          if (a.product_price < b.product_price) {
            return 1
          }
          if (a.product_price > b.product_price) {
            return -1
          }
          else return 0
        })
        return {
          ...state,
          products: orderproducts
        }
      }

      if (action.payload === 'price min-max') {
        let orderproducts = state.products.sort((a, b) => {
          if (a.product_price < b.product_price) {
            return -1
          }
          if (a.product_price > b.product_price) {
            return 1
          }
          else return 0
        })
        return {
          ...state,
          products: orderproducts
        }
      }
    }

    case "ORDER_BY_RATING": {
      if (action.payload === 'rating max-min') {
        let orderproducts = state.products.sort((a, b) => {
          if (a.product_rating < b.product_rating) {
            return 1
          }
          if (a.product_rating > b.product_rating) {
            return -1
          }
          else return 0
        })
        return {
          ...state,
          products: orderproducts
        }
      }

      if (action.payload === 'rating min-max') {
        let orderproducts = state.products.sort((a, b) => {
          if (a.product_rating < b.product_rating) {
            return -1
          }
          if (a.product_rating > b.product_rating) {
            return 1
          }
          else return 0
        })
        return {
          ...state,
          products: orderproducts
        }
      }
    }

    default: return { ...state }

  }
}
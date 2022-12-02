import {
  ADD_ALL_FAVORITES,
  ADD_CART_LOCAL_STORAGE,
  ADD_FAVORIT,
  ADD_REVIEW_PRODUCT_REAL_TIME,
  ADD_TO_CART_PC,
  ARMAMENT_PC_PRODUCT,
  CAR_MODIFIER,
  CREATE_USER,
  DELETE_DETAILS,
  DELETE_FAVORIT,
  DELETE_PC_PRODUCT,
  FILTER_SEARCH,
  LOGIN_USER,
  PAGES_HOME,
  USER_CLOSE,
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
  productsOfer: [],
  paymentUserDates: {},
  armamentPc: [],

  // reviewsPc:[]

  detailsReviews: {},

};

export const reducerFetch = (state = initialState, action) => {
  switch (action.type) {
    //FETCH
    case 'GET_PRODUCTS': {
      const ofertDay = action.payload.filter(
        ({ product_ofer }) => product_ofer === true
      );
      return {
        ...state,
        products: action.payload,
        copieProducts: action.payload,
        productsOfer: ofertDay,
      };
    }
    case 'GET_DETAILS_PRODUCTS': {
      //Eliminar el reviews cuando haga el push
      return {
        ...state,
        detailsProduct: action.payload,
        reviews: action.payload.reviews,
      };
    }
    case ADD_REVIEW_PRODUCT_REAL_TIME: {
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    }
    case 'POST_CREATE_REVIEW': {
      return {
        ...state,
        reviews: [...state.reviews, { ...action.payload }],
      };
    }
    case ADD_FAVORIT: {
      const productNewFavorit = state.copieProducts.find(
        (product) => product.product_id === Number(action.payload)
      );
      productNewFavorit.product_favorite = true;
      const productFavorit = state.products.find(
        (product) => product.product_id === Number(action.payload)
      );
      productFavorit.product_favorite = true;
      return state;
    }
    case 'GET_STOCK_PRODUCTS': {
      return {
        ...state,
        stockProducts: action.payload,
      };
    }
    case CREATE_USER: {
      window.localStorage.setItem(USER, JSON.stringify([action.payload]));
      return {
        ...state,
        userDates: action.payload,
        userlogin: true,
      };
    }
    case LOGIN_USER: {
      console.log(action.payload);

      console.log(state);
      return {
        ...state,
        userDates: action.payload,
        userlogin: true,
        copieProducts: state.products,
      };
    }
    case USER_CLOSE: {
      window.localStorage.removeItem(USER);
      state.products.forEach((product) => {
        return (product.product_favorite = false);
      });
      return {
        ...state,
        userlogin: false,
        userDates: {},
      };
    }
    case DELETE_FAVORIT: {
      const productCopie = state.copieProducts.find(
        (product) => product.product_id === action.payload
      );
      productCopie.product_favorite = false;
      const product = state.products.find(
        (product) => product.product_id === action.payload
      );
      product.product_favorite = false;
      return state;
    }
    case ADD_ALL_FAVORITES: {
      console.log('HOLA DEDE ALL_FAVORITES');
      if (state.userDates?.hasOwnProperty('user_favorites')) {
        state.products.forEach((product) => {
          return state.userDates.user_favorites.forEach((productF) => {
            if (productF.product_id === product.product_id) {
              product.product_favorite = true;
              console.log('HOLA DEDE ALL_FAVORITES TRUE FAVORITE');
              return product;
            }
          });
        });
        state.products.forEach((product) => {
          if (!product.hasOwnProperty('product_favorite')) {
            return (product.product_favorite = false);
          }
        });
        console.log(state);
        return state;
      }
      return state;
    }
    //CART
    case ADD_CART_LOCAL_STORAGE: {
      const mapCarStorage = JSON.parse(action.payload);
      const cart = mapCarStorage?.reduce(
        (a, b) => Number(a) + Number(b.product_price) * Number(b.product_count),
        0
      );
      return {
        ...state,
        car: mapCarStorage,
        priceTotal: cart,
      };
    }
    case ADD_TO_CART: {
      let existProduct = state.car.find(
        ({ product_id }) => product_id === action.payload.product.product_id
      );
      if (existProduct) {
        existProduct.product_count =
          existProduct.product_count + action.payload.count;

        state = {
          ...state,
        };
        const priceTotal = state.car.reduce(
          (a, b) => Number(a) + Number(b.product_price) * b.product_count,
          0
        );
        window.localStorage.setItem(CAR, JSON.stringify(state.car));
        return {
          ...state,
          priceTotal,
        };
      }
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
      window.localStorage.setItem(CAR, JSON.stringify(state.car));
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
    //FILTROS
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

      state.products.forEach((product) => {
        const name =
          product.product_name
            .toLowerCase()
            .indexOf(state.filters.search.toLowerCase()) !== -1;
        const price =
          Number(product.product_price) <= Number(action.payload.price);
        if (
          action.payload.category.length > 0 &&
          action.payload.brand.length > 0
        ) {
          if (
            action.payload.category.includes(product.product_category) &&
            action.payload.brand.includes(product.product_brand) &&
            price &&
            name
          ) {
            return filterproducts.push(product);
          }
          return;
        }
        if (action.payload.category.length > 0) {
          if (
            action.payload.category.includes(product.product_category) &&
            price &&
            name
          ) {
            return filterproducts.push(product);
          }
          return;
        }
        if (action.payload.brand.length > 0) {
          if (
            action.payload.brand.includes(product.product_brand) &&
            product.product_price <= action.payload.price &&
            name
          ) {
            return filterproducts.push(product);
          }
          return;
        }
        if (price && state.filters.search.length > 0) {
          if (name) {
            return filterproducts.push(product);
          }
          return;
        }
        return;
      });

      return {
        ...state,
        copieProducts: filterproducts,
      };
    }
    case DELETE_DETAILS: {
      return {
        ...state,
        detailsProduct: {},
      };
    }
    case 'ORDER_BY_PRICE': {
      if (action.payload === 'price max-min') {
        let orderproducts = state.copieProducts.sort((a, b) => {
          if (Number(a.product_price) < Number(b.product_price)) {
            return 1;
          }
          if (Number(a.product_price) > Number(b.product_price)) {
            return -1;
          } else return 0;
        });
        return {
          ...state,
          copieProducts: orderproducts,
        };
      }

      if (action.payload === 'price min-max') {
        let orderproducts = state.copieProducts.sort((a, b) => {
          if (Number(a.product_price) < Number(b.product_price)) {
            return -1;
          }
          if (Number(a.product_price) > Number(b.product_price)) {
            return 1;
          } else return 0;
        });
        return {
          ...state,
          copieProducts: orderproducts,
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

    case ARMAMENT_PC_PRODUCT: {
      let existProduct = state.armamentPc.find(
        ({ product_category, product_name }) =>
          product_category === action.payload.product_category &&
          product_name === action.payload.product_name
      );
      if (existProduct) {
        if (
          existProduct?.product_category === 'Ram' ||
          existProduct?.product_category === 'Perifericos'
        ) {
          existProduct.product_count = existProduct.product_count + 1;
          state = {
            ...state,
          };
          return state;
        }
        return state;
      }
      action.payload.product_count = 1;
      return {
        ...state,
        armamentPc: [...state.armamentPc, action.payload],
      };
    }
    case ADD_TO_CART_PC: {
      return {
        ...state,
        car: [...state.car, ...action.payload.products],
        armamentPc: [],

        priceTotal: Number(state.priceTotal) + Number(action.payload.price),
      };
    }
    case DELETE_PC_PRODUCT: {
      console.log(action.payload);

      console.log(state.armamentPc);
      const products = state.armamentPc.filter(
        (product) => product.product_id !== action.payload
      );
      console.log(products);
      return {
        ...state,
        armamentPc: products,
      };

      }
    };

    case "GET_USER": {
      return {
        ...state,
        user: action.payload
      }

    }
    case "PUT_UPDATE_USER": {
      return {
        ...state,
        userDates: { ...state.userDates, ...action.payload }
      }
    }

    case 'FILTER_BY_RAITING': {
      let productsByRaiting = state.detailsProduct.review.filter(e => e.review_score == action.payload)
      return {
        ...state,
        detailsReviews: {...state.detailsProduct, review: productsByRaiting}
      }
    }

    default:
      return state;
  }
};

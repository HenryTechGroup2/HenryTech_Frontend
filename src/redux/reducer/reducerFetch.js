import {
  ADD_ALL_FAVORITES,
  ADD_CART_LOCAL_STORAGE,
  ADD_FAVORIT,
  ADD_REVIEW_PRODUCT_REAL_TIME,
  ADD_TO_CART_PC,
  ARMAMENT_PC_PRODUCT,
  BIENVENIDO,
  CAR_MODIFIER,
  CHANGE_PASSWORD,
  CHANGE_USER,
  CREATE_USER,
  CREATE_USER_AUTH0,
  DELETE_CART,
  DELETE_DETAILS,
  DELETE_FAVORIT,
  DELETE_PC_PRODUCT,
  DELETE_USERS,
  ERROR,
  FILTER_SEARCH,
  FILTER_STAR,
  HOVER,
  LOGIN_USER,
  MESSAGE,
  MESSAGE_ADMIN,
  MESSAGE_USER,
  MESSAGE_USER_POST,
  MSG,
  MSG_ADMIN,
  MSG_RECEIVED_INPUT,
  ORDER_VIEWS,
  PAGES_HOME,
  SELECT_ORDER,
  USER_ALL_MSG,
  USER_CLOSE,
  WIDTH,
} from '../actions';
import { ADD_TO_CART, DELETE_TO_CAR } from '../actionsCar';
import { AUTH0, CAR, PASSWORD, USER } from '../storage/variables';
const initialState = {
  priceTotal: 0,
  productIdCar: 1,
  products: [],
  invoices: [],
  users: [],
  car: [],
  copieProducts: [],
  reviews: [],
  productsOfer: [],
  armamentPc: [],
  detailsReviews: [],
  productsMostView: [],
  productsMostRating: [],
  userDates: {},
  detailsProduct: {},
  paymentUserDates: {},
  viewHome: false,
  userlogin: false,
  loadingReviews: false,
  loadingHome: false,
  messageUser: [],
  messageAllUser: [],
  userAllMessages: [],
  userMessage: [],
  filters: {
    search: '',
    price: 0,
    category: [],
    active: false,
  },
  validateRegister: {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  errorAxios: null,
  width: 0,
  msgReceivdes: '',
  hover: null,
};

export const reducerFetch = (state = initialState, action) => {
  switch (action.type) {
    //FETCH
    case DELETE_USERS: {
      return {
        ...state,
        users: [],
      };
    }
    case 'GET_PRODUCTS': {
      const ofertDay = action.payload.filter(
        ({ product_ofer }) => product_ofer === true
      );
      const productsOrder = [...action.payload];
      let orderproducts = productsOrder.sort((a, b) => {
        if (a.product_views < b.product_views) {
          return 1;
        }
        if (a.product_views > b.product_views) {
          return -1;
        }
        return 0;
      });
      let orderRating = productsOrder.sort((a, b) => {
        if (a.product_rating < b.product_rating) {
          return 1;
        }
        if (a.product_rating > b.product_rating) {
          return -1;
        }
        return 0;
      });
      action.payload.forEach((product) => {
        if (product.product_ofer === true) {
          product.oferta = product.product_price - product.product_price / 5;
        }
      });
      return {
        ...state,
        products: action.payload,
        copieProducts: action.payload,
        productsOfer: ofertDay,
        loadingHome: true,
        productsMostView: orderproducts,
        productsMostRating: orderRating,
      };
    }
    case 'GET_DETAILS_PRODUCTS': {
      //Eliminar el reviews cuando haga el push
      if (state.userDates.hasOwnProperty('user_name')) {
        if (state.userDates.user_favorites.length > 0) {
          const favoritProduct = state.userDates.user_favorites.find(
            ({ product_id }) => product_id === action.payload.product_id
          );
          if (favoritProduct) {
            action.payload.product_favorite = true;

            return {
              ...state,
              detailsProduct: action.payload,
              detailsReviews: action.payload.reviews,
              reviews: action.payload.reviews,
              loadingReviews: true,
            };
          }
        }
        action.payload.product_favorite = false;
      }
      return {
        ...state,
        detailsProduct: action.payload,
        detailsReviews: action.payload.reviews,
        reviews: action.payload.reviews,
        loadingReviews: true,
      };
    }
    case ADD_REVIEW_PRODUCT_REAL_TIME: {
      return {
        ...state,
        detailsReviews: [...state.detailsReviews, action.payload],
      };
    }
    case 'POST_CREATE_REVIEW': {
      return {
        ...state,
        reviews: [...state.reviews, { ...action.payload }],
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
      const newFavorits = state.userDates.user_favorites.filter(
        ({ product_id }) => product_id !== action.payload
      );
      if (state.detailsProduct.hasOwnProperty('product_name')) {
        return {
          ...state,
          userDates: {
            ...state.userDates,
            user_favorites: newFavorits,
          },
          detailsProduct: {
            ...state.detailsProduct,
            product_favorite: false,
          },
        };
      }
      return {
        ...state,
        userDates: {
          ...state.userDates,
          user_favorites: newFavorits,
        },
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
      if (state.detailsProduct.hasOwnProperty('product_name')) {
        return {
          ...state,
          userDates: {
            ...state.userDates,
            user_favorites: [
              ...state.userDates.user_favorites,
              productNewFavorit,
            ],
          },
          detailsProduct: {
            ...state.detailsProduct,
            product_favorite: true,
          },
        };
      }
      return {
        ...state,
        userDates: {
          ...state.userDates,
          user_favorites: [
            ...state.userDates.user_favorites,
            productNewFavorit,
          ],
        },
      };
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
      window.localStorage.setItem(USER, JSON.stringify([action.payload]));
      return {
        ...state,
        userDates: action.payload,
        userlogin: true,
        copieProducts: state.products,
      };
    }
    case CREATE_USER_AUTH0: {
      window.localStorage.setItem(USER, JSON.stringify([action.payload]));
      window.localStorage.setItem(AUTH0, 'YES');
      return {
        ...state,
        userlogin: true,
        userDates: action.payload,
      };
    }
    case USER_CLOSE: {
      window.localStorage.removeItem(USER);
      window.localStorage.removeItem(AUTH0);

      state.products.forEach((product) => {
        return (product.product_favorite = false);
      });
      return {
        ...state,
        userlogin: false,
        userDates: {},
      };
    }

    case ADD_ALL_FAVORITES: {
      if (state.userDates?.hasOwnProperty('user_favorites')) {
        state.products.forEach((product) => {
          return state.userDates.user_favorites.forEach((productF) => {
            if (productF.product_id === product.product_id) {
              product.product_favorite = true;

              return product;
            }
          });
        });
        state.products.forEach((product) => {
          if (!product.hasOwnProperty('product_favorite')) {
            return (product.product_favorite = false);
          }
        });
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
      const productDelete = state.car.find(
        ({ product_id }) => product_id === action.payload.id
      );
      productDelete.productExistToCart = false;
      state = {
        ...state,
        car: products,
        priceTotal: state.priceTotal - action.payload.price,
      };
      window.localStorage.setItem(CAR, JSON.stringify(state.car));
      return state;
    }
    case DELETE_CART: {
      window.localStorage.removeItem(CAR);

      return {
        ...state,
        car: [],
        priceTotal: 0,
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
    case FILTER_SEARCH: {
      let filterproducts = [];
      state.products.forEach((product) => {
        const matchName =
          product.product_name
            .toLowerCase()
            .indexOf(action.payload.toLowerCase()) !== -1;
        if (state.filters.active) {
          const matchPrice =
            Number(product.product_price) <= Number(state.filters.price);
          if (state.filters.category.length) {
            const matchCategory = state.filters.category.includes(
              product.product_category
            );
            if (matchName && matchPrice && matchCategory)
              filterproducts.push(product);
          } else {
            if (matchName && matchPrice) filterproducts.push(product);
          }
        } else {
          if (matchName) filterproducts.push(product);
        }
      });

      return {
        ...state,
        copieProducts: filterproducts,
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
        const matchName =
          product.product_name
            .toLowerCase()
            .indexOf(state.filters.search.toLowerCase()) !== -1;
        const matchPrice =
          Number(product.product_price) <= Number(action.payload.price);
        if (action.payload.category.length) {
          const matchCategory = action.payload.category.includes(
            product.product_category
          );
          if (matchName && matchPrice && matchCategory) {
            filterproducts.push(product);
          }
        } else {
          if (matchName && matchPrice) {
            filterproducts.push(product);
          }
        }
      });
      return {
        ...state,
        copieProducts: filterproducts,
        filters: {
          ...state.filters,
          price: action.payload.price,
          category: action.payload.category,
          active: action.payload.active,
        },
      };
    }
    case FILTER_STAR: {
      if (action.payload === 'Todas') {
        return {
          ...state,
          detailsReviews: state.reviews,
        };
      }
      const reviewsFiltered = state.reviews.filter(
        (review) => Number(review.review_score) === Number(action.payload)
      );
      return {
        ...state,
        detailsReviews: reviewsFiltered,
      };
    }
    case DELETE_DETAILS: {
      return {
        ...state,
        detailsProduct: {},
        loadingReviews: false,
      };
    }
    case SELECT_ORDER: {
      if (action.payload === 'mayor-precio') {
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

      if (action.payload === 'menor-precio') {
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
      if (action.payload === 'mayor-puntuacion') {
        let orderproducts = state.copieProducts.sort((a, b) => {
          if (a.product_rating < b.product_rating) {
            return 1;
          }
          if (a.product_rating > b.product_rating) {
            return -1;
          } else return 0;
        });
        return {
          ...state,
          copieProducts: orderproducts,
        };
      }

      if (action.payload === 'menor-puntuacion') {
        let orderproducts = state.copieProducts.sort((a, b) => {
          if (a.product_rating < b.product_rating) {
            return -1;
          }
          if (a.product_rating > b.product_rating) {
            return 1;
          } else return 0;
        });
        return {
          ...state,
          copieProducts: orderproducts,
        };
      }
      let productsOrder = [...state.copieProducts];
      if (action.payload === 'mas-visto') {
        let orderproducts = productsOrder.sort((a, b) => {
          if (a.product_views < b.product_views) {
            return 1;
          }
          if (a.product_views > b.product_views) {
            return -1;
          }
          return 0;
        });
        return {
          ...state,
          copieProducts: orderproducts,
        };
      }
      if (action.payload === 'menos-visto') {
        let orderproducts = productsOrder.sort((a, b) => {
          if (a.product_views < b.product_views) {
            return -1;
          }
          if (a.product_views > b.product_views) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          copieProducts: orderproducts,
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
      let existCategory = state.armamentPc.find(
        ({ product_category }) =>
          product_category === action.payload.product_category
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
      if (existCategory) {
        if (
          existCategory?.product_category === 'Memorias RAM' ||
          existCategory?.product_category === 'Teclados' ||
          existCategory?.product_category === 'Mouses' ||
          existCategory?.product_category === 'Microfonos' ||
          existCategory?.product_category === 'Camaras' ||
          existCategory?.product_category === ''
        ) {
          action.payload.product_count = 1;

          return {
            ...state,
            armamentPc: [...state.armamentPc, action.payload],
          };
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
      const newProductsToCart = [];
      action.payload.products.forEach((productArmament) => {
        state.car.forEach((product) => {
          if (product.product_id === productArmament.product_id) {
            product.product_count =
              product.product_count + productArmament.product_count;
            productArmament.productExistToCart = true;
            return false;
          }
        });
        if (productArmament?.productExistToCart) return;
        return newProductsToCart.push(productArmament);
      });
      return {
        ...state,
        car: [...state.car, ...newProductsToCart],
        armamentPc: [],

        priceTotal: Number(state.priceTotal) + Number(action.payload.price),
      };
    }
    case DELETE_PC_PRODUCT: {
      const products = state.armamentPc.filter(
        (product) => product.product_id !== action.payload
      );
      return {
        ...state,
        armamentPc: products,
      };
    }
    case 'GET_USER': {
      return {
        ...state,
        userDates: action.payload,
      };
    }
    case 'PUT_UPDATE_USER': {
      window.localStorage.setItem(PASSWORD, action.payload.password);
      return {
        ...state,
        userDates: { ...state.userDates, ...action.payload.data },
      };
    }
    case 'FILTER_BY_RAITING': {
      let productsByRaiting = state.detailsProduct.review.filter(
        (e) => Number(e.review_score) === Number(action.payload)
      );
      return {
        ...state,
        detailsReviews: { ...state.detailsProduct, review: productsByRaiting },
      };
    }
    case 'POST_CREATE_PRODUCT': {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case 'GET_USERS': {
      return {
        ...state,
        users: action.payload,
      };
    }
    case 'GET_INVOICE': {
      return {
        ...state,
        invoices: action.payload,
      };
    }
    case 'GET_REVIEWS': {
      return {
        ...state,
        reviews: action.payload,
      };
    }
    case ERROR: {
      return {
        ...state,
        errorAxios: action.payload,
      };
    }
    case WIDTH: {
      return {
        ...state,
        width: action.payload,
      };
    }
    case 'PUT_UPDATE_PRODUCT': {
      return {
        ...state,
      };
    }
    case BIENVENIDO: {
      return {
        ...state,
        bienvenido: action.payload,
      };
    }
    //TODO RECIEN CAMBIADO
    case MESSAGE: {
      const newMessage = {
        ...action.payload,
        msgreceiveds: [],
      };
      if (
        action.payload.msgpost_id !==
        state.userDates.msgposts[state.userDates.msgposts.length - 1].msgpost_id
      ) {
        return {
          ...state,
          userDates: {
            ...state.userDates,
            msgposts: [...state.userDates.msgposts, newMessage],
          },
        };
      }
      return state;
    }
    case MSG: {
      const newMessage = state.userDates;
      newMessage?.msgposts[
        state.userDates?.msgposts?.length - 1
      ]?.msgreceiveds?.push(action.payload);
      return {
        ...state,
        userDates: {
          ...state.userDates,
          msgposts: newMessage.msgposts,
        },
      };
    }
    case MSG_ADMIN: {
      return state;
    }
    case MESSAGE_ADMIN: {
      return state;
    }
    case USER_ALL_MSG: {
      return {
        ...state,
        userAllMessages: action.payload,
        userMessage: [action.payload[0]],
      };
    }
    case MESSAGE_USER_POST: {
      const newState = state;

      const userExist = newState.userAllMessages.find(
        ({ user_id }) => user_id === action.payload.userUserId
      );
      if (
        userExist?.msgposts[userExist.msgposts.length - 1].msgpost_id !==
        action.payload.msgpost_id
      ) {
        const newMessages = {
          ...action.payload,
          msgreceiveds: [],
        };
        userExist?.msgposts.push(newMessages);
        return {
          ...newState,
        };
      }
      return state;
    }
    case MESSAGE_USER: {
      const newUserMessage = state.userMessage[0];

      newUserMessage.msgposts[
        newUserMessage.msgposts.length - 1
      ].msgreceiveds.push(action.payload);
      return {
        ...state,
        msgReceivdes: '',
        userMessage: [newUserMessage],
      };
    }
    case CHANGE_USER: {
      return {
        ...state,
        userMessage: [action.payload],
      };
    }
    case MSG_RECEIVED_INPUT: {
      return {
        ...state,
        msgReceivdes: action.payload,
      };
    }
    case HOVER: {
      return {
        ...state,
        hover: !state.hover,
      };
    }
    case CHANGE_PASSWORD: {
      return {
        ...state,
        userDates: {
          ...state.userDates,
          user_password: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

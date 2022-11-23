
<<<<<<< HEAD
const initialState = {
  products: [],
  userloggin: false,
  stockProducts: [{ title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", stock: 10 }, { title: "Mens Casual Premium Slim Fit T-Shirts ", stock: 35 }, { title: "Mens Cotton Jacket", stock: 4 }]
=======

const inicialState = {
  copieProducts: [],
  products: []
>>>>>>> afa496f (SearchBar and Filter)
}

export const reducerFetch = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS": {
      return {
        ...state,
        products: action.payload
      }
    }
    case "GET_STOCK_PRODUCTS": {
      return {
        ...state,
        stockProducts: action.payload
      }
    }
    case 'PRODUCT_BY_NAME': return {
      ...state,
      products: action.payload
    }
<<<<<<< HEAD
    default:
      return state;
=======

    case 'FILTER_BY_PRICE': {
      let filterproducts = state.copieProducts.filter(e => e.product_price <= action.payload)
      return {
        ...state,
        products: filterproducts
      }
    }

    default: return { ...state }
>>>>>>> afa496f (SearchBar and Filter)
  }
};


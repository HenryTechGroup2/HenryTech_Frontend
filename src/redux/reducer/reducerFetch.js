const initialState = {
  products: [],
  userlogin: false,
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

    default:
      return state;
  }
};

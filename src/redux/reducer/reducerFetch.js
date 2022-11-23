

const inicialState = {
  copieProducts: [],
  products: []
}

export const reducerFetch = (state = inicialState, action) => {
  switch (action.type) {
    case 'PRODUCT_BY_NAME': return {
      ...state,
      products: action.payload
    }

    case 'FILTER_BY_PRICE': {
      let filterproducts = state.copieProducts.filter(e => e.product_price <= action.payload)
      return {
        ...state,
        products: filterproducts
      }
    }

    default: return { ...state }
  }
};


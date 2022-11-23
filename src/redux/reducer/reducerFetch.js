

const inicialState = {
  products: []
}

export const reducerFetch = (state = inicialState, action) => {
  switch (action.type) {
    case 'PRODUCT_BY_NAME': return {
      ...state,
      products: action.payload
    }

    default: return { ...state }
  }
};

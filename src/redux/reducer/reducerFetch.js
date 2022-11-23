const initialState = {
  products:[],
  userloggin: false,

}

export const reducerFetch = (state= initialState, action) => {
  switch(action.type){
    case "GET_PRODUCTS":{
      return {
        ...state,
        products: action.payload
      }
    }
    
    default:
      return state;
  }
};

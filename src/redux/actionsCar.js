export const ADD_TO_CART = '@car/add';
export const DELETE_TO_CAR = '@car/delete';
export const addToCar = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};
export const deleteProductCar = (product) => {
  const price = product.product_price * product.product_count;
  return {
    type: DELETE_TO_CAR,
    payload: {
      id: product.product_id,
      price,
    },
  };
};

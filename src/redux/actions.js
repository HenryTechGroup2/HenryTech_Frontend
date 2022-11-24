import axios from "axios";

export function getAllProducts(){
    try {
        return async function (dispatch) {
            const result = await axios.get("https://fakestoreapi.com/products")
            return dispatch({
                        type: "GET_PRODUCTS",
                        payload: result.data
                    })
        }
    } catch (error) {
        throw new Error (error.message)
    }
}

//Llamar al stock de productos 
export function getStockProducts(){
    try {
        return async function (dispatch){
            const result = await axios.get("https://fakestoreapi.com/getstock")
            return dispatch({
                type:"GET_STOCK_PRODUCTS",
                payload: result.data
            })
        }
    } catch (error) {
        throw new Error (error.message)
    }
}

export function getDetailsProducts(id){
   try {
    return async function (dispatch) {
        const result = await axios.get(`https://fakestoreapi.com/products/${id}`)
        return dispatch({
                    type: "GET_DETAILS_PRODUCTS",
                    payload: result.data
                })
    }
   } catch (error) {
        throw new Error (error.message)
   }
}

export function postCreateReview(payload){
    try {
        return async function(dispatch){
            const result4 = await axios.post("`https://fakestoreapi.com/products/",payload)
            return dispatch({
                type: "POST_CREATE_REVIEW",
                payload: result4.data
            })
        }
    } catch (error) {
        throw new Error (error.message)
    }
}
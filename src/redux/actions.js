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
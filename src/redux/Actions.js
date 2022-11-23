import axios from 'axios'


export function productByname(title) {
    try {
        return async function (dispatch) {
            let productName = await axios(`https://fakestoreapi.com/products?title=${title}`)
           // console.log(productName.data)
            return dispatch({
                type: 'PRODUCT_BY_NAME',
                payload: productName.data
            })
        }
    } catch (e) {
        throw new Error(e)
    }
}
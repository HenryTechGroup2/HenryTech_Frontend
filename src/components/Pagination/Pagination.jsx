import React from "react";
import { useSelector } from "react-redux";

export function Pagination ({paginado, actualPage, next, prev}){

    const products = useSelector(state=>state.products)
    const productsPage= 16;
    const numberPage = Math.ceil((products.length)/productsPage);


    return (
                <div>
                    <div>
                    <button onClick={prev}>Prev</button>
                    <button onClick={()=>paginado(actualPage)}>{actualPage}</button>
                    <button onClick={next}>Next</button>
                    </div>
                </div>
            )

}

export default Pagination
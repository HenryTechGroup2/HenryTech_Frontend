import React from "react";

import {connect} from "react-redux"



export function Pagination (props){

    const productsPage= 16;
    const numberPage = Math.ceil((props.products.length)/productsPage);


    return (
                <div>
                    <div>
                    <button onClick={props.prev}>Prev</button>
                    <button onClick={()=>props.paginado(props.actualPage)}>{props.actualPage}</button>
                    <button onClick={props.next}>Next</button>
                    </div>
                </div>
            )

}

function mapStateToProps(state){
    return {
        products: state.products,
    }
}

export default connect (mapStateToProps, null) (Pagination)
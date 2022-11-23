import React from "react";
import Product from "./Product.js";
import { connect} from "react-redux";
import {getAllProducts} from "../redux/actions.js"
import { useEffect } from "react";


export function Products (props){

    useEffect(()=>{
        props.getAllProducts()},[])
    
    // action para llamar al stock de los productos 
        // useEffect(()=>{
        //     props.getAllProducts()},[])

    return (
        <div>
            {props.products.map(product => {
                return (
                    <div>
                    <Product 
                    key= {product.id}
                    id= {product.id}
                    title= {product.title}
                    rating = {product.rating.rate}
                    image= {product.image}
                    category= {product.category}
                    price= {product.price}
                    stock = {1}
                    />
                </div>
                )
            })}
        </div>
    )
}

function mapDispatchToProps (dispatch){
    return {
        getAllProducts: () => dispatch(getAllProducts()),
    }
}

function mapStateToProps (state){
    return {
        products: state.products,
    }
}


export default connect (mapStateToProps, mapDispatchToProps) (Products)
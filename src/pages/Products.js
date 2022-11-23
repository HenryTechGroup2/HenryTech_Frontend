import React from "react";
import Product from "./Product.js";
import { connect} from "react-redux";
import {getAllProducts, getStockProducts} from "../redux/actions.js"
import { useEffect } from "react";


export function Products (props){

    useEffect(()=>{
        props.getAllProducts()},[])
    
    // action para llamar al stock de los productos y que se guarden en el estado globar stockProducts 
        // useEffect(()=>{
        //     props.getStockProducts()},[])

    return (
        <div>
            {props.products.map(product => {
                const stockProduct = props.stockProducts.find(e=>e.title===product.title)
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
                    stock = {stockProduct?.stock}
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
        getStockProducts: () => dispatch(getStockProducts())
    }
}

function mapStateToProps (state){
    return {
        products: state.products,
        stockProducts: state.stockProducts
    }
}


export default connect (mapStateToProps, mapDispatchToProps) (Products)
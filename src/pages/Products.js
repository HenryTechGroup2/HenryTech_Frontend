import React from "react";
import Product from "./Product.js";
import { connect} from "react-redux";
import {getAllProducts, getStockProducts} from "../redux/actions.js"
import { useEffect } from "react";
import Pagination from "./Pagination.js";
import { useState } from "react";


export function Products (props){

    useEffect(()=>{
        props.getAllProducts()},[])
    
    // action para llamar al stock de los productos y que se guarden en el estado globar stockProducts 
        // useEffect(()=>{
        //     props.getStockProducts()},[])

        const [actualPage, setActualPage] = useState(1)
        const productsPage= 16
        const page = actualPage*productsPage
        const productsforPage=props.products.slice((page-productsPage),page)

        function pag(number){
            setActualPage(number)
        }

        function next(){
            const numberPage = Math.ceil((props.products.length)/productsPage);
            if(actualPage !==numberPage){
                setActualPage(actualPage+1) 
            }
        }
        function prev(){
            if(actualPage !==1){
                setActualPage(actualPage-1)
            }
        }

    return (
        <div>
            {productsforPage.map(product => {
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
                     <div>
                    <Pagination
                    paginado={pag}
                    next={next}
                    prev={prev}
                    actualPage={actualPage}
                    />
                </div>
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
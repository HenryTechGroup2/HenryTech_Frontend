import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDetailsProducts } from "../redux/actions.js";
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CreateReview from './CreateReview.js';


export function Details() {

    const params = useParams()
    const dispatch = useDispatch()
    const detailsProduct = useSelector(state=>state.detailsProduct)
    const products = useSelector(state=>state.products)
    const userloggin = useSelector(state=>state.userloggin)


    useEffect(() => {
        dispatch(getDetailsProducts(params.id))
    }, [])

    if (Object.entries(detailsProduct).length > 0) {
        return (
            <div>
                <div>
                    <Link to={"/"}>
                        <button>Inicio</button>
                    </Link>
                </div >
                <div>
                    <h1>{detailsProduct.title}</h1>
                    <img src={detailsProduct.image} alt="" />
                    <div>

                        <p>Description {detailsProduct.description}</p>
                        <p>Category {detailsProduct.category} </p>
                        <p>Raiting {detailsProduct.rating.rate}</p>
                    </div>
                    <button type="submit">Agregar al carrito</button>
                </div>
                <div>
                    <CreateReview/>
                </div>

            </div>
        )
    }

}


export default Details
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDetailsProducts } from "../redux/actions.js";
import { connect } from 'react-redux';
import { useEffect } from 'react';


export function Details(props) {

    const params = useParams()

    useEffect(() => {
        props.getDetailsProducts(params.id)
    }, [])

    if (Object.entries(props.detailsProduct).length > 0) {
        return (
            <div>
                <div>
                    <Link to={"/"}>
                        <button>Inicio</button>
                    </Link>
                </div >
                <div>
                    <h1>{props.detailsProduct.title}</h1>
                    <img src={props.detailsProduct.image} alt="" />
                    <div>

                        <p>Description {props.detailsProduct.description}</p>
                        <p>Category {props.detailsProduct.category} </p>
                        <p>Raiting {props.detailsProduct.rating.rate}</p>
                    </div>
                </div>

            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        detailsProduct: state.detailsProduct,
        products: state.products,
        userloggin: state.userloggin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDetailsProducts: (id) => dispatch(getDetailsProducts(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
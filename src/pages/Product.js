import React from "react";
import { Link } from "react-router-dom";
import { connect} from "react-redux";

export function Product (props){
    return (
        <div>
             <div>
            <h1>Nombre: {props.title}</h1>
            <h2>Puntuación: {props.rating}</h2>
            <Link to={`/products/${props.id}`}>
            <img src={`${props.image}`} alt={props.title} />
            </Link>
            <p>categoría: {props.category} </p>
            <h3>precio: {props.price}</h3>
            {/* Si usuario está logeado y hay cantidad en el stock que se habilite el carrito de compra  de lo contrario que se desabilite*/}
            <p>Stock:{props.stock} </p>
            <button type="submit" disabled={props.userloggin&&props.stock? false:true}>Agregar al carrito</button>
            </div>
        </div>
       
    )
}

function mapStateToProps (state){
    return {
        userloggin: state.userloggin
    }
}

export default connect (mapStateToProps, null) (Product)
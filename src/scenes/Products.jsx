import React, { useEffect }from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { mockDataProducts } from "../data/mockData";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {getAllProducts} from "../redux/actions.js"
import BarChart from "./dashboard/BarChart.jsx";

//Users, products, invoice, reviews
export function Products (){
    const columns = [{field: "product_id", headerName: "ID"},
    {field: "product_name", headerName: "Nombre"},
    {field: "product_description", headerName: "Descripción"},
    {field: "product_price", headerName: "Precio"},
    {field: "product_ofer", headerName: "Oferta"},
    {field: "product_rating", headerName: "Puntuación"},
    {field: "product_img", headerName: "Imagen principal"},
    {field: "product_array_img", headerName: "Imagenes secundarias"},
    {field: "stock", headerName: "Cantidad en Stock"},

    ]
    const dispatch = useDispatch();    
    useEffect(()=>
    dispatch(getAllProducts()),[]) 
    const products = useSelector(state=>state.products)

    if(products.length>0){
        return (
            <div>
            <h1>PRODUCTOS</h1>
            <div style={{ height: 450, width: '100%' }}>
            <BarChart/>
            </div>
            <div  style={{ height: 450, width: '100%' }}>
            <DataGrid checkboxSelection 
            getRowId={(row)=> row.product_id}
            rows={products}
            columns={columns}
            components={{Toolbar:GridToolbar}}
            />
            </div>
            <div>
                <Link to="/admin/products/crearproducto">
                <button>Crear producto</button>
                </Link>
            </div>
            </div>
        )
    }
    
}

export default Products;
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { mockDataProducts } from "../data/mockData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, updateProduct } from "../redux/actions.js"
import BarChart from "./dashboard/BarChart.jsx";
import styles from './FormStyle.module.css'

//Users, products, invoice, reviews
export function Products() {
    const columns = [{ field: "product_id", headerName: "ID" },
    { field: "product_name", headerName: "Nombre" },
    { field: "product_description", headerName: "Descripción" },
    { field: "product_price", headerName: "Precio" },
    { field: "product_ofer", headerName: "Oferta" },
    { field: "product_rating", headerName: "Puntuación" },
    { field: "product_img", headerName: "Imagen principal" },
    { field: "product_array_img", headerName: "Imagenes secundarias" },
    { field: "product_stock", headerName: "Cantidad en Stock" },
    ]

    const [id, setId] = useState(1)

    const dispatch = useDispatch();
    useEffect(() =>
        dispatch(getAllProducts()), [])
    const products = useSelector(state => state.products)

    const newProducts = products.map((product) => {
        return { ...product, product_stock: product.stock.stock_amount }
    })

    function handleOnEdit(e) {
        console.log(e)
        setId(e)
    }

    const clickOnEdit = () => {
        dispatch(updateProduct())
    }

    if (products.length > 0) {
        return (
            <div>
                <h1>PRODUCTOS</h1>
                <div style={{ height: 450, width: '100%' }}>
                    <BarChart />
                </div>
                <div style={{ height: 450, width: '80%' }}>
                    <DataGrid
                    // checkboxSelection
                    // onSelectionChange={ e => handleOnEdit(e)}
                    //isCellEditable={(params) => params.row.age % 2 === 0}
                    
                    getRowId={(row) => row.product_id}
                    rows={newProducts}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: "#7eda55",
                        },
                        color: "white",
                        weigth: "80%",
                        marginLeft: "20%",
                    }}
                    />
                </div>
                <div className={styles.divform}>
                    <Link to="/admin/products/crearproducto">
                        <button >Crear producto</button>
                    </Link>
                </div>
                <div className={styles.divform}>
                    <Link to={`/admin/products/editarproducto/${id}`}>
                        <button >Editar producto</button>
                    </Link>
                </div>
            </div>
        )
    }

}

export default Products;
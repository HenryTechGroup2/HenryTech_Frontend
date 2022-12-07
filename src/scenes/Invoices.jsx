import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import {getInvoice} from "../redux/actions.js"
import BarChartInvoice from "./dashboard/BarChartInvoice.jsx";

//Users, products, invoice, reviews
export function Invoices (){
    const columns = [{field: "invoice_id", headerName: "ID"},
    {field: "invoice_amount", headerName: "Total"},
    {field: "invoice_shipping", headerName: "Método de pago"},
    {field: "invoice_user_id", headerName: "Usuario"},
    ]

    const dispatch = useDispatch();    
    useEffect(()=>
    dispatch(getInvoice()),[]) 
    const invoices = useSelector(state=>state.invoices)

    if(invoices.length>0){
    return (
        <div>
        <h1>FACTURAS</h1>
        <div  style={{ height: 450, width: '100%' }}>
        <DataGrid checkboxSelection 
        getRowId={(row)=> row.invoice_id}
        rows={invoices}
        columns={columns}
        components={{Toolbar:GridToolbar}}
        sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: "#7eda55",
            },
            color: "white",
            weigth:"80%",
            marginLeft: "20%",
        }}
        />
        </div>
        <div>
            <BarChartInvoice/>
        </div>
        </div>
    )}
}

export default Invoices;
import React from "react";
import { Link } from "react-router-dom";
import Bar from "./Bar.jsx";
import BarChart from "./BarChart.jsx";
import BarChartInvoice from "./BarChartInvoice.jsx";
import PieChart from "./PieChart.jsx"
//Users, products, invoice, reviews
export function Dashboard (){
    return (
        <div >
            <h1>ENCUENTRA TODAS LAS ESTADISTICAS DE TU TIENDA AQUI</h1>
            <Bar/>
            <div>
            <h2>Gráfico Puntuación vs ProductoId</h2>
            <BarChart/>
            </div>
            <div>
            <h2>Gráfico Total en pesos vs UsuarioId</h2>
            <BarChartInvoice/>
            </div>
            <div>
            <h2>Cantidad de productos en oferta</h2>
            <PieChart/>
            </div>
        </div>
    )
}

export default Dashboard;

import React, { useEffect } from "react";
import { ResponsiveBar } from '@nivo/bar'
import { useDispatch, useSelector } from 'react-redux';
import { getInvoice } from "../../redux/actions.js"

export function BarChartInvoice() {

  const dispatch = useDispatch();
  useEffect(() =>
      dispatch(getInvoice()), [])
  const invoices = useSelector(state => state.invoices)

//   const invoices = [
//     {
//         id: 1,
//         invoice_amount: "20000.80",
//         invoice_shipping: "Mercado Pago",
//         invoice_user_id: 4,
//         invoice_order_id: null
//     },
//     {
//         id: 2,
//         invoice_amount: "40000.80",
//         invoice_shipping: "Mercado Pago",
//         invoice_user_id: 3,
//         invoice_order_id: null
//     },
//     {
//         id: 3,
//         invoice_amount: "3000.80",
//         invoice_shipping: "Mercado Pago",
//         invoice_user_id: 1,
//         invoice_order_id: null
//     },
//     {
//         id: 4,
//         invoice_amount: "20230.80",
//         invoice_shipping: "Mercado Pago",
//         invoice_user_id: 2,
//         invoice_order_id: null
//     },
//     {
//         id: 5,
//         invoice_amount: "100000.80",
//         invoice_shipping: "Mercado Pago",
//         invoice_user_id: 1,
//         invoice_order_id: null
//     }
//   ]

  const array = []
  const invoicesdata = []
  invoices.forEach(e => {
    if (!array.includes(e.invoice_user_id)) {
      array.push(e.invoice_user_id)
    }
  })
  array.forEach(e => {
    invoicesdata.push({
      userid: e,
      amount: 0
    })
  })
  invoices.forEach(e => {
    invoicesdata.forEach(a => {
      if (a.userid === e.invoice_user_id) {
        a.amount= a.amount+Number(e.invoice_amount)
      }
    })
  })
  


  if(invoices.length >0){
  return (
    <div style={{ height: 400, width: '100%' }}>
      <ResponsiveBar
        data={invoicesdata}
        keys={["amount"]}
        indexBy="userid"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        colors="#7eda55"
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Cantidad en pesos",
          legendPosition: "middle",
          legendOffset: -40
        }}
      />
    </div>
  )
  }
}
export default BarChartInvoice
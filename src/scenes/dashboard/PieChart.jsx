import React, { useEffect } from "react";
import { ResponsivePie } from '@nivo/pie'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from "../../redux/actions.js"

export function BarChartInvoice() {

  const dispatch = useDispatch();
  useEffect(() =>
      dispatch(getAllProducts()), [])
  const products = useSelector(state => state.products)

//   const products = [
//     {
//         id: 22,
//         product_name: "Teclado T-dagger T-tgk321-gw-br Arena White/green Sw Brown F",
//         product_description: "Este teclado...",
//         product_price: "7199.00",
//         product_ofer: true,
//         product_rating: 1,
//         product_category: "Teclados",
//         product_img: "https://res.cloudinary.com/dd9tlax1c/image/upload/v1669503884/Teclados/D_NQ_NP_2X_950459-MLA51574185481_092022-F_bn0rzu.webp",
//         product_array_img: [],
//         product_stock_id: 22,
//         stock: {
//             stock_id: 22,
//             stock_amount: 50
//         }
//     },
//     {
//         id: 23,
//         product_name: "Teclado Pc Steelseries Apex 5 Original Nuevo",
//         product_description: "El teclado para ...",
//         product_price: "28199.00",
//         product_ofer: true,
//         product_rating: 1,
//         product_category: "Teclados",
//         product_img: "https://res.cloudinary.com/dd9tlax1c/image/upload/v1669504364/Teclados/D_NQ_NP_2X_915176-MLA48002910841_102021-F_xgbsns.webp",
//         product_array_img: [
//             "https://res.cloudinary.com/dd9tlax1c/image/upload/v1669504392/Teclados/D_NQ_NP_2X_811108-MLA48002910847_102021-F_rt6mch.webp"
//         ],
//         product_stock_id: 23,
//         stock: {
//             stock_id: 23,
//             stock_amount: 50
//         }
//     },
//     {
//         id: 24,
//         product_name: "Teclado gamer Nisuta NSKBGZ61 QWERTY Outemu Red español España color rosa con luz RGB",
//         product_description: "¡Teclado ideal ...",
//         product_price: "12599.00",
//         product_ofer: false,
//         product_rating: 1,
//         product_category: "Teclados",
//         product_img: "https://res.cloudinary.com/dd9tlax1c/image/upload/v1669505987/Teclados/D_NQ_NP_2X_771964-MLA44400701409_122020-F_e0ww9p.webp",
//         product_array_img: [
//             "https://res.cloudinary.com/dd9tlax1c/image/upload/v1669506044/Teclados/D_NQ_NP_2X_835174-MLA44400318884_122020-F_hukhet.webp"
//         ],
//         product_stock_id: 24,
//         stock: {
//             stock_id: 24,
//             stock_amount: 50
//         }
//     },
//   ]

  const productsdata = []
  productsdata.push({
    id: true,
    value: 0,
    // color:"#32ba7c"
  })
 productsdata.push({
    id: false,
    value: 0,
    // color:"#7eda55"
  })
  products.forEach(e => {
    productsdata.forEach(a => {
      if (a.id === e.product_ofer) {
        a.value= a.value+1
      }
    })
  })
  


  if(products.length >0){
  return (
    <div style={{ height: 400, width: '100%' }}>
      <ResponsivePie
        data={productsdata}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#7eda55"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#7eda55',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#7eda55'
                        }
                    }
                ]
            }
        ]}
      />
    </div>
  )
  }
}
export default BarChartInvoice
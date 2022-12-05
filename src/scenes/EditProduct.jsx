import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions.js';
import styles from './FormStyle.module.css'


export const UpdateProduct = () => {
  // const params = useParams();
  // const id = params.id;
  // const dispatch = useDispatch();

  // const initialState = {
  //   product_name: product.product_name,
  //   product_description: product.product_description,
  //   product_price: product.product_price,
  //   product_ofer: product.product_ofer,
  //   product_category: product.product_category,
  //   product_img: product.product_img,
  // };

  // const [input, setInput] = useState(initialState);
  // const [errors, setErrors] = useState({});

  // function handleOnChange(e) {
  //   e.preventDefault();
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  //   setErrors(
  //     validate({
  //       ...input,
  //       [e.target.name]: e.target.value,
  //     })
  //   );
  // }

  // function handleOnSubmit(e) {
  //   e.preventDefault();
  //   dispatch(updateProduct(input, id));
  //   alert('Tus datos fueron actualizados');
  // }

  // if (Object.entries(product).length > 0) {
  //   return (
  //     <div style={styles.divform}>
  //       <div className={styles.form}>
  //         <h1>Actualiza tu produto: </h1>
  //         <form onSubmit={(e) => handleOnSubmit(e)}>
  //           <div>
  //             <label>Nombre:</label>
  //             <input
  //               type='text'
  //               name='product_name'
  //               value={input.product_name}
  //               defaultValue={product.product_name}
  //               onChange={(e) => handleOnChange(e)}
  //             />
  //             {errors.product_name && <p>{errors.product_name}</p>}
  //           </div>
  //           <h2>Descripción:</h2>
  //           <div>
  //             <label>Descripción:</label>
  //             <input
  //               type='text'
  //               name='product_description'
  //               value={input.product_description}
  //               defaultValue={product.product_description}
  //               onChange={(e) => handleOnChange(e)}
  //             />
  //             {errors.product_description && <p>{errors.product_description}</p>}
  //           </div>
  //           <div>
  //             <label>Precio:</label>
  //             <input
  //               type='number'
  //               name='product_price'
  //               value={input.product_price}
  //               defaultValue={product.product_price}
  //               onChange={(e) => handleOnChange(e)}
  //             />
  //             {errors.product_price && (
  //               <p>{errors.product_price}</p>
  //             )}
  //           </div>
  //           <div>
  //             <label>Oferta:</label>
  //             <input
  //               type='bool'
  //               name='product_ofer'
  //               value={input.product_ofer}
  //               defaultValue={product.product_ofer}
  //               onChange={(e) => handleOnChange(e)}
  //             />
  //             {errors.product_ofer && <p>{errors.product_ofer}</p>}
  //           </div>
  //           <div>
  //             <label>Categoría:</label>
  //             <input
  //               type='text'
  //               name='product_category'
  //               value={input.product_category}
  //               defaultValue={product.product_category}
  //               onChange={(e) => handleOnChange(e)}
  //             />
  //           </div>
  //           <div>
  //             <label>Imagen:</label>
  //             <input
  //               type='text'
  //               name='product_img'
  //               value={input.product_img}
  //               defaultValue={product.product_img}
  //               onChange={(e) => handleOnChange(e)}
  //             />
  //           </div>
  //           <button
  //             type='submit'
  //             disabled={Object.entries(errors).length === 0 ? false : true}
  //           >
  //             Actualizar
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div>
      <h1>Productooo</h1>
    </div>
  )
};

export const EditProduct = () => {

  const [id, setId] = useState(1);

  const dispatch = useDispatch();
  useEffect(() =>
    dispatch(getAllProducts()), [])
  const products = useSelector(state => state.products)

  function handleOnSelect(id) {
    //const product= products.find(e=>e.product_id===id) 
    setId(id)
  }

  if (products.length > 0) {
    return (
      <div className={styles.divform}>
        <div>
          <label>Selecciona el Id del producto para editar</label>
          <select onChange={e => handleOnSelect(e)}>
            {products.map(e => {
              return (
                <option value={e.product_id} name={e.product_id}>{e.product_id}</option>
              )
            })}
          </select>
        </div>
      </div>
    )
  }

}

export default EditProduct
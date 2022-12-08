import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../redux/actions.js';
import styles from './FormStyle.module.css'
import { useParams, useNavigate } from 'react-router-dom';



export const EditProduct = ({ products }) => {
  const params = useParams()
  const id = params.id;
  const product = products.find(e => e.product_id == id)
  console.log(product)
  const dispatch = useDispatch();

  const initialState = {
    product_name: product.product_name,
    product_brand: product.product_brand,
    product_description: product.product_description,
    product_price: product.product_price,
    product_ofer: product.product_ofer,
    product_category: product.product_category,
    product_stock: product.product_stock,
    product_img: product.product_img,
    product_array_img: product.product_array_img,
  };
   
  console.log(initialState)

  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  function handleOnChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(updateProduct(input, id));
    alert('Tus datos fueron actualizados');
    navigate("/admin/products")
  }


    if (Object.entries(product).length > 0) {
    return (
      <div className={styles.divform}>
        <div className={styles.form}>
          <h1>Actualiza tu produto: </h1>
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <div>
              <label>Nombre:</label>
              <input
                type='text'
                name='product_name'
                value={input.product_name}
                // defaultValue={product.product_name}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.product_name && <p>{errors.product_name}</p>}
            </div>
            <div>
              <label>Descripción:</label>
              <input
                type='text'
                name='product_description'
                value={input.product_description}
                // defaultValue={product.product_description}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.product_description && <p>{errors.product_description}</p>}
            </div>
            <div>
              <label>Marca:</label>
              <input
                type='text'
                name='product_brand'
                value={input.product_brand}
                // defaultValue={product.product_name}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.product_brand && <p>{errors.product_brand}</p>}
            </div>
            <div>
              <label>Precio:</label>
              <input
                type='number'
                name='product_price'
                value={input.product_price}
                // defaultValue={product.product_price}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.product_price && (
                <p>{errors.product_price}</p>
              )}
            </div>
            <div>
              <label>Oferta:</label>
              <input
                type='boolean'
                name='product_ofer'
                value={input.product_ofer}
                // defaultValue={product.product_ofer}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.product_ofer && <p>{errors.product_ofer}</p>}
            </div>
            <div>
              <label>Categoría:</label>
              <input
                type='text'
                name='product_category'
                value={input.product_category}
                // defaultValue={product.product_category}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>Cantidad en stock:</label>
              <input
                type='number'
                name='product_stock'
                value={input.product_stock}
                // defaultValue={product.product_category}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>Imagen:</label>
              <input
                type='text'
                name='product_img'
                value={input.product_img}
                // defaultValue={product.product_img}
                onChange={(e) => handleOnChange(e)}
              />
              {input.product_img? <img src={input.product_img} alt={`imagen de ${input.product_name}`} width="50" height="60" />: null }
            </div>
            <div>
              <label>Imagenes secundarias:</label>
              <input
                type='text'
                name='product_array_img'
                value={input.product_array_img}
                // defaultValue={product.product_img}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <button
              type='submit'
              disabled={Object.entries(errors).length === 0 ? false : true}
            >
              Actualizar
            </button>
          </form>
        </div>
      </div>
    );
  }

}

export default EditProduct
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCreateProduct, getAllProducts } from '../redux/actions.js';
import styles from './FormStyle.module.css'

export function CreateProducts() {
  const initialState = {
    product_name: '',
    product_description: '',
    product_price: '',
    product_ofer: true,
    product_rating: '',
    product_category: '',
    product_img: '',
    product_array_img: [],
    // stock: '',
  };

  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  useEffect(() =>
    dispatch(getAllProducts()), [])
  const products = useSelector(state => state.products)
  const category = []
  const allcategory = products.forEach(e => {
    if (!category.includes(e.product_category)) {
      category.push(e.product_category)
    }
  })


  function handleOnChange(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input)
  }



  function validate(input) {
    let errors = {};
    if (!input.product_name) {
      errors.product_name = 'Escribe el nombre del producto';
    }
    if (!input.product_description) {
      errors.product_description = 'Escribe una descripción para el producto';
    }
    if (!input.product_price) {
      errors.product_price = 'Ingresa el precio del producto';
    } else if (!/[0-9]/.test(input.product_price)) {
      errors.product_price = 'Ingresa un precio válido, solo se admiten numeros';
    }
    if (!input.product_rating) {
      errors.product_rating = 'Ingresa un valor entre 1 a 5 ';
    } else if (!/[0-9]/.test(input.product_rating)) {
      errors.product_rating = 'Ingresa un valor válido, solo se admiten numeros';
    } else if (input.product_rating > 5) {
      errors.product_rating = 'Ingresa un valor entre 1 a 5 ';
    }
    if (!input.product_img) {
      errors.product_img = 'Ingresa el link de la imagen';
    }
    // if (!input.stock) {
    //   errors.stock = 'Ingrese una cantidad del producto';
    // } else if (!/[0-9]/.test(input.stock)){
    //   errors.stock = "El stock solo admite numeros"
    // }
    return errors;
  }

  function handleOnSelect(e) {
    setInput({
      ...input,
      product_ofer: e.target.value
    })
  }
  function handleOnSelectstart(e) {
    setInput({
      ...input,
      product_rating: e.target.value
    })
  }
  function handleOnSelectcategory(e) {
    setInput({
      ...input,
      product_category: e.target.value
    })
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(input)
    dispatch(postCreateProduct(input));
    alert('Producto creado');
    setInput({
      initialState,
    });
  }

  return (
    <div className={styles.divform} >
      <div className={styles.form}>
        <h2>Crea tu producto</h2>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div>
            <label>Nombre del producto</label>
            <input
              placeholder='Nombre del producto'
              type='text'
              name='product_name'
              value={input.product_name}
              onChange={(e) => handleOnChange(e)}
            />
            {errors.product_name && <p>{errors.product_name}</p>}
          </div>
          <div>
            <label>Descripción</label>
            <textarea
              placeholder='Agrega la descripción del producto'
              type='text'
              name='product_description'
              value={input.product_description}
              onChange={(e) => handleOnChange(e)}
            />
            {errors.product_description && <p>{errors.product_description}</p>}
          </div>
          <div>
            <label>¿El producto está en oferta?</label>
            <select onChange={e => handleOnSelect(e)}>
              <option value="true" name="true">True</option>
              <option value="false" name="false">False</option>
            </select>
          </div>
          <div>
            <label>Precio</label>
            <input
              placeholder='Igresa el precio del producto'
              type='number'
              name='product_price'
              value={input.product_price}
              onChange={(e) => handleOnChange(e)}
            />
            {errors.product_price && <p>{errors.product_price}</p>}
          </div>
          <div>
            <label>Selecciona la puntuación</label>
            <select onChange={e => handleOnSelectstart(e)}>
              <option value={1}>☆</option>
              <option value={2}>☆☆</option>
              <option value={3}>☆☆☆</option>
              <option value={4}>☆☆☆☆</option>
              <option value={5}>☆☆☆☆☆</option>
            </select>
          </div>
          <div>
            <label>Selecciona una categoría</label>
            <select onChange={e => handleOnSelectcategory(e)}>
              {category.map(e => {
                return (
                  <option value={e} name={e}>{e}</option>
                )
              })}
            </select>
          </div>
          <div>
            <label>Imagen principal del producto</label>
            <input
              placeholder='Igresa la imagen del producto'
              type='text'
              name='product_img'
              value={input.product_img}
              onChange={(e) => handleOnChange(e)}
            />
            {errors.product_img && <p>{errors.product_img}</p>}
          </div>
          <div>
            <label>Imagenes secundarias</label>
            <input
              placeholder='Igresa otra imagen'
              type='text'
              name='product_array_img'
              value={input.product_array_img}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          {/* <div>
        <label>Cantidad en stock</label>
          <input
            placeholder='Igresa la cantidad existente para el producto'
            type='number'
            name='stock'
            value={input.stock}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.stock && <p>{errors.stock}</p>}
        </div> */}
          <button type='submit' disabled={Object.entries(errors).length === 0 ? false : true}
            onClick={(e) => handleOnSubmit(e)}
          > Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from '../../redux/actions';

export default function GetFilters() {
  // let allproducts = useSelector((state) => state.copieProducts);
  let products = useSelector((state) => state.products);

  let allprices = [];
  products.forEach((product) => allprices.push(Number(product.product_price)));
  //  El reduce no funciona asi
  let maxPrice = Math.max(...allprices);
  let minPrice = Math.min(...allprices);
  let inicialstate = {
    price: minPrice,
    category: [],
    brand: [],
  };

  let [input, setInput] = useState(inicialstate);

  let allcategories = [];
  products.forEach((e) => allcategories.push(e.product_category));
  let uniquecategories = allcategories.filter((valor, index) => {
    return allcategories.indexOf(valor) === index;
  });

  let allbrands = [];
  products.forEach((e) => allbrands.push(e.product_brand));
  let uniquebrands = allbrands.filter((valor, index) => {
    return allbrands.indexOf(valor) === index;
  });

  let dispatch = useDispatch();

  function filtersOnClick(e) {
    e.preventDefault();
    dispatch(filters(input));
  }

  let priceOnChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  let categoryOnChange = (e) => {
    if (e.target.checked) {
      setInput({ ...input, category: [...input.category, e.target.value] });
    }
    if (!e.target.checked) {
      let indexout = input.category.indexOf(e.target.value);
      input.category.splice(indexout, 1);
      setInput({ ...input, category: input.category });
    }
  };

  let brandOnChange = (e) => {
    if (e.target.checked) {
      setInput({ ...input, brand: [...input.brand, e.target.value] });
    }
    if (!e.target.checked) {
      let indexout = input.brand.indexOf(e.target.value);
      input.brand.splice(indexout, 1);
      setInput({ ...input, brand: input.brand });
    }
  };

  return (
    <div>
      <div>
        <h3>Precio:</h3>
        <p>{/* {minprice} - {input.price} */}</p>
        <input
          type='range'
          min={minPrice}
          max={maxPrice}
          name='price'
          value={input.price}
          onChange={(e) => priceOnChange(e)}
        />
        {/* <input type='text' placeholder="filtra por precio" onChange={(e) => priceOnChange(e)} />
                <input type='submit' onClick={(e) => priceOnClick(e)} /> */}
      </div>
      <div>
        <h3>Categorias:</h3>
        {uniquecategories.map((e) => {
          return (
            <div key={e}>
              <label>
                <input
                  type='checkbox'
                  name={e}
                  value={e}
                  onChange={(e) => categoryOnChange(e)}
                />
                {e}
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Marcas:</h3>
        {uniquebrands.map((e) => {
          return (
            <div key={e}>
              <label>
                <input
                  type='checkbox'
                  name={e}
                  value={e}
                  onChange={(e) => brandOnChange(e)}
                />
                {e}
              </label>
            </div>
          );
        })}
      </div>
      <br />
      <div>
        <button onClick={(e) => filtersOnClick(e)}>Aplicar filtros</button>
      </div>
    </div>
  );
}

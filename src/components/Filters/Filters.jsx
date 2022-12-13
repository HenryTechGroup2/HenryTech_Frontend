import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from '../../redux/actions';

export default function GetFilters({ handleClickPage }) {
  let products = useSelector((state) => state.products);

  let allprices = [];
  products.forEach((product) => allprices.push(Number(product.product_price)));
  //  El reduce no funciona asi
  let maxPrice = Math.max(...allprices);
  let minPrice = Math.min(...allprices);
  let inicialstate = {
    price: maxPrice,
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
    handleClickPage(1);
    dispatch(filters({ ...input, active: true }));
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

  useEffect(() => {
    return () => {
      dispatch(filters({ ...inicialstate, active: false }));
      handleClickPage(1);
    }

  }, []);
  return (
    <div className='filter'>
      <div className='filter__div'>
        <h3 className='filter__h3'>Precio</h3>
        <div className='filter__range'>
          <span className='filter__price'>{minPrice}</span>
          <input
            className='filter__input'
            type='range'
            min={minPrice}
            max={maxPrice}
            name='price'
            value={input.price}
            onChange={(e) => priceOnChange(e)}
          />
          <span className='filter__price'>{maxPrice}</span>
        </div>
        <div className='filter__input--price'>
          {input.price === Infinity ? minPrice : input.price}
        </div>
        {/* <input type='text' placeholder="filtra por precio" onChange={(e) => priceOnChange(e)} />
                <input type='submit' onClick={(e) => priceOnClick(e)} /> */}
      </div>
      <div className='filter__div'>
        <h3 className='filter__h3'>Categorias</h3>
        <div className='filter__categorys'>
          {uniquecategories.map((category) => {
            return (
              <div className='filter__map' key={category}>
                <div className='filter__category'> {category}</div>
                <input
                  className='filter__check'
                  type='checkbox'
                  name={category}
                  value={category}
                  onChange={(e) => categoryOnChange(e)}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className='filter__marcas'>
        <h3 className='filter__h3'>Marcas</h3>
        {uniquebrands.map((e) => {
          return (
            <div className='filter__map' key={e}>
              <input
                className='filter__check'
                type='checkbox'
                name={e}
                value={e}
                onChange={(e) => brandOnChange(e)}
              />
              {e}
            </div>
          );
        })}
      </div> */}
      <div className='filter__aplique'>
        <button className='filter__button' onClick={(e) => filtersOnClick(e)}>
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}

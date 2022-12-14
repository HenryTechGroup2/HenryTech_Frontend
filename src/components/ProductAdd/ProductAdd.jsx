import axios from 'axios';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { Container, FormGroup, Input } from 'reactstrap';
import { ERROR, postCreateProduct } from '../../redux/actions';
import { close } from '../../utils/Icons';
import ModalLoading from '../ModalLoading/ModalLoading';
import ModalResponse from '../ModalResponse/ModalResponse';
import ViewProduct from '../ViewProduct/ViewProduct';
const INITITAL_STATE = {
  product_name: '',
  product_ofer: false,
  product_price: '',
  product_category: '',
  product_img: null,
  product_array_img: [],
  product_stock: '',
  product_brand: '',
  product_description: '',
  product_rating: 1,
  product_views: 0,
};
const ProductAdd = ({ handleAddProduct }) => {
  const [carruzel, setCarruzel] = useState(0);
  const [product, setProduct] = useState(INITITAL_STATE);
  const [responseBackend, setResponseBacked] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const [loadings, setLoadings] = useState('');
  const [loadings2, setLoadings2] = useState(false);

  const inputs = [
    {
      type: 'text',
      name: 'product_name',
      description: 'Nombre del producto',
      values: product.product_name,
    },
    {
      type: 'textarea',
      name: 'product_description',
      description: 'Descripcion',
      values: product.product_description,
    },
    {
      type: 'number',
      name: 'product_price',
      description: 'Precio',
      values: product.product_price,
    },
    {
      type: 'text',
      name: 'product_category',
      description: 'Categoria',
      values: product.product_category,
    },
    {
      type: 'number',
      name: 'product_stock',
      description: 'Cantidad',
      values: product.product_stock,
    },
    {
      type: 'text',
      name: 'product_brand',
      description: 'Marca',
      values: product.product_brand,
    },
  ];
  const handleClick = (index) => {
    if (index === 0) return setCarruzel(0);
    setCarruzel(index * 30);
  };
  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleChangeAllFIles = (evt) => {
    const { name, files } = evt.currentTarget;
    if (product.product_array_img.length >= 4) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setProduct({
        ...product,
        [name]: [...product[name], reader.result.toString()],
      });
    };
  };
  const validateProduct = (product) => {
    const product_name_re = /^.{8,50}$/;
    const product_name_bool = product_name_re.test(product.product_name);
    const product_categories = [
      'Teclados',
      'Procesadores',
      'Placas Madres',
      'Notebooks',
      'Mouses',
      'Monitores',
      'Microfonos',
      'Memorias RAM',
      'GPU',
      'Gabinetes',
      'Fuentes de Poder',
      'Cooler Fan',
      'Consolas',
      'Camaras',
      'Auriculares',
      'Almacenamiento',
    ];
    const product_categories_bool = product_categories.includes(
      product.product_category
    );
    const product_brand_re = /^.{3,10}$/;
    const product_brand_bool = product_brand_re.test(product.product_brand);
    const product_img_bool = product.product_img !== null;
    const product_price_bool =
      product.product_price > 0 && product.product_price < 9999999;
    const product_stock_bool =
      product.product_stock > 0 && product.product_stock < 500;
    console.log(
      product_name_bool,
      product_categories_bool,
      product_brand_bool,
      product_img_bool,
      product_price_bool,
      product_stock_bool
    );
    if (
      product_name_bool &&
      product_categories_bool &&
      product_brand_bool &&
      product_img_bool &&
      product_price_bool &&
      product_stock_bool
    ) {
      return true;
    }
    return false;
  };
  const handlePostProduct = async (evt) => {
    evt.preventDefault();
    if (!validateProduct(product)) return;
    try {
      console.log('ULTIMO MENSAJE');
      setLoading(() => true);
      const res = await dispatch(postCreateProduct(product));
      setLoading(() => null);
      setResponseBacked(res.payload.complete);
      setTimeout(() => {
        setResponseBacked(null);
      }, 2500);
      setProduct(INITITAL_STATE);
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.data.response.data,
      });
    }
  };
  const handleChangeOfer = (evt) => {
    const { name, checked } = evt.currentTarget;
    setProduct({
      ...product,
      [name]: checked,
    });
  };

  const handleDrop = (files) => {
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `codeinfuse, medium, gist`);
      formData.append('upload_preset', 'Learning');
      formData.append('api_key', '913529548732914');
      formData.append('timestamp', (Date.now() / 1000) | 0);
      setLoadings('true');
      return axios
        .post(
          'https://api.cloudinary.com/v1_1/dpte23mmk/image/upload',
          formData,
          {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
          }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          let specificArrayInObject = product.product_array_img;
          specificArrayInObject.push(fileURL);
          const newobj = { ...product, specificArrayInObject };
          setProduct(newobj);
        });
    });
    axios.all(uploaders).then(() => {
      setLoadings('false');
    });
  };
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Learning');
    setLoadings2(true);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dpte23mmk/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    setProduct({ ...product, product_img: file.secure_url });
    setLoadings2(false);
  };
  return (
    <div className='post__container'>
      {loading === null ? null : <ModalLoading />}
      {responseBackend === null ? null : (
        <ModalResponse response={responseBackend} />
      )}
      <div className='post__carruzel'>
        <div
          className='post__carruzell'
          style={{ transform: `translateX(-${carruzel}em)` }}
        >
          <div className='post'>
            <form className='post__form' onSubmit={handlePostProduct}>
              <div className='post__aux'>
                <div className='post__close' onClick={handleAddProduct}>
                  {close}
                </div>
              </div>
              {inputs.map((item, index) => (
                <div className='post__div' key={index}>
                  {item.type === 'textarea' ? (
                    <textarea
                      placeholder={item.description}
                      className='post__input post__textarea'
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      name={item.name}
                      value={item.values}
                      onChange={handleChange}
                      placeholder={item.description}
                      type={item.type}
                      className='post__input'
                    />
                  )}
                </div>
              ))}
              <div className='post__div post__flex'>
                <div className='post__files'>
                  <Container>
                    <FormGroup>
                      <span className='post__span'>Añadir Imagen</span>
                      <Input
                        onChange={uploadImage}
                        name='product_img'
                        type='file'
                        className='post__file'
                      />
                    </FormGroup>
                  </Container>
                </div>
                <div className='post__files'>
                  <Container>
                    <Dropzone
                      className='dropzone'
                      onDrop={handleDrop}
                      onChange={(e) => setProduct(e.target.value)}
                      value={product}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps({ className: 'dropzone' })}>
                            <input
                              {...getInputProps()}
                              onChange={handleChangeAllFIles}
                              type='file'
                              className='post__file'
                              name='product_array_img'
                            />
                            <span className='post__span'>Añadir Imagenes</span>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </Container>
                </div>
              </div>
              <div className='post__div post__check'>
                <span className='post__ofert'>Producto en Oferta?</span>
                <input
                  name='product_ofer'
                  type='checkbox'
                  onChange={handleChangeOfer}
                />
              </div>
              <div className='post__div post__flex'>
                <button
                  onClick={() => handleClick(1)}
                  className='post__btn'
                  type='button'
                >
                  Previulizar Producto
                </button>
                <button className='post__btn' type='submit'>
                  Añadir Producto
                </button>
              </div>
            </form>
          </div>
          <ViewProduct product={product} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;

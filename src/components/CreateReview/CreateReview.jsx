import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useEffect } from 'react';
import {
  ADD_REVIEW_PRODUCT_REAL_TIME,
  api,
  getAllProducts,
  getDetailsProducts,
} from '../../redux/actions';
const server = io(api);

const star = ['☆', '☆', '☆', '☆', '☆'];
export function CreateReview({ productId }) {
  const [reviews, setReviews] = useState([]);
  const initialState = {
    review_title: '',
    review_body: '',
    review_score: '',
  };

  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [startState, setStarState] = useState({
    cantityStar: 1,
    confirmStar: null,
  });
  useEffect(() => {
    const newReview = (message) => {
      dispatch({ type: ADD_REVIEW_PRODUCT_REAL_TIME, payload: message });
      setReviews([...reviews, message]);
      dispatch(getDetailsProducts(productId));
      dispatch(getAllProducts());
    };
    server.on('@review/create/successful', newReview);
    return () => {
      server.off('@review/create/successful', newReview);
    };
  }, [reviews]);
  const dispatch = useDispatch();
  const { userDates } = useSelector((state) => state);
  //Inputs Changes
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
  }
  function validate(input) {
    let errors = {};
    if (!input.review_title) {
      errors.review_title = 'Escribe el titulo de la reseña';
    } else if (!/[A-z]/.test(input.review_title)) {
      errors.review_title = 'Escribe el titulo de la reseña';
    }
    if (input.review_score > 5) {
      errors.review_score = 'Ingresa una puntuación hasta 5';
    } else if (!input.review_score) {
      errors.review_score = 'Dejanos tu puntuación al producto';
    }
    if (!input.review_body) {
      errors.review_body = 'Cuentanos como te parecio el producto';
    } else if (!/[A-z]/.test(input.review_body)) {
      errors.review_body = 'Cuentanos como te parecio el producto';
    }
    return errors;
  }
  //Envio de encuesta
  function handleOnSubmit(e) {
    e.preventDefault();
    server.emit('@review/create', {
      review_title: input.review_title,
      review_body: input.review_body,
      review_score: input.review_score,
      review_product_id: productId,
      review_user_id: userDates.user_id,
    });
    setInput({
      ...initialState,
    });
  }
  //Stars
  function handleMouseStar(index) {
    setInput({
      ...input,
      review_score: index + 1,
    });
    setStarState({
      ...startState,
      cantityStar: index,
    });
  }
  function handleClickStar(index, name) {
    if (name === 'change') {
      setInput({
        ...input,
        review_score: index + 1,
      });
      return setStarState({
        ...startState,
        cantityStar: index,
      });
    }
    setStarState({
      ...startState,
      confirmStar: true,
    });
  }
  return (
    <div className='review'>
      <form className='review__form' onSubmit={(e) => handleOnSubmit(e)}>
        <div className='review__div'>
          <p className='review__cstar'>
            {startState.confirmStar === null
              ? star.map((star, index) => (
                  <span
                    key={index}
                    className='review__star'
                    onMouseEnter={() => handleMouseStar(index)}
                    onClick={handleClickStar}
                  >
                    {startState.cantityStar >= index ? '★' : star}
                  </span>
                ))
              : star.map((star, index) => (
                  <span
                    key={index}
                    className='review__star'
                    onClick={() => handleClickStar(index, 'change')}
                  >
                    {startState.cantityStar >= index ? '★' : star}
                  </span>
                ))}
          </p>
        </div>
        <div className='review__msg'>
          <input
            placeholder='Que te parecio el producto'
            className='review__input'
            type='text'
            name='review_body'
            value={input.review_body}
            onChange={(e) => handleOnChange(e)}
          />

          <button className='review__button' type='submit'>
            <img src='../send.png' alt='' />
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateReview;

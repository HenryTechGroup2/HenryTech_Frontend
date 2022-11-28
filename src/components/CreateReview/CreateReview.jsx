import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCreateReview } from '../../redux/actions.js';
const star = ['☆', '☆', '☆', '☆', '☆'];
export function CreateReview() {
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
  const dispatch = useDispatch();

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

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(postCreateReview(input));
    alert('Reseña creada');
    setInput({
      initialState,
    });
  }
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
      <h2 className='review__h2'>Deja tu reseña aquí</h2>
      <form className='review__form' onSubmit={(e) => handleOnSubmit(e)}>
        <div className='review__div'>
          {/* <label className='review__label'>Titulo de la reseña:</label> */}
          <input
            className='review__input'
            placeholder='Add title review'
            type='text'
            name='review_title'
            value={input.review_title}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.review_title && <p>{errors.review_title}</p>}
          <p className='review__cstar'>
            {startState.confirmStar === null
              ? star.map((star, index) => (
                  <span
                    className='review__star'
                    onMouseEnter={() => handleMouseStar(index)}
                    onClick={handleClickStar}
                  >
                    {startState.cantityStar >= index ? '★' : star}
                  </span>
                ))
              : star.map((star, index) => (
                  <span
                    className='review__star'
                    onClick={() => handleClickStar(index, 'change')}
                  >
                    {startState.cantityStar >= index ? '★' : star}
                  </span>
                ))}
          </p>
        </div>
        <div className='review__div'>
          {/* <label className='review__label'>Puntaje</label> */}
          {/* <input
            className='review__input'
            type='number'
            name='review_score'
            value={input.review_score}
            onChange={(e) => handleOnChange(e)}
            ★
          />
          {errors.review_score && <p>{errors.review_score}</p>} */}
        </div>
        <div className='review__div'>
          {/* <label className='review__label'>Cuentanos:</label> */}
          <textarea
            placeholder='Add to opinion'
            className='review__textarea'
            type='text'
            name='review_body'
            value={input.review_body}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.review_body && <p>{errors.review_body}</p>}
        </div>
        <button
          className='review__button'
          type='submit'
          disabled={Object.entries(errors).length === 0 ? false : true}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default CreateReview;

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCreateReview } from '../../redux/actions.js';

export function CreateReview() {
  const initialState = {
    review_title: '',
    review_body: '',
    review_score: '',
  };

  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  function handleOnChange(e) {
    e.preventDefault();
    console.log(input);
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

  return (
    <div>
      <h1>Deja tu reseña aquí</h1>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <div>
          <label>Titulo de la reseña:</label>
          <input
            type='text'
            name='review_title'
            value={input.review_title}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.review_title && <p>{errors.review_title}</p>}
        </div>
        <div>
          <label>Puntaje</label>
          <input
            type='number'
            name='review_score'
            value={input.review_score}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.review_score && <p>{errors.review_score}</p>}
        </div>
        <div>
          <label>Cuentanos:</label>
          <input
            type='text'
            name='review_body'
            value={input.review_body}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.review_body && <p>{errors.review_body}</p>}
        </div>
        <button
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

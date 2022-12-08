import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/actions.js';
import styles from './FormStyle.module.css'
import { useParams, useNavigate } from 'react-router-dom';



export const UpdateUserAdmin = ({ users }) => {
  const params = useParams()
  const id = params.id;
  const user = users.find(e => e.user_id == id)
  console.log(user)
  const dispatch = useDispatch();

  const initialState = {
    user_name: user.user_name,
    user_email: user.user_email,
    user_phone: user.user_phone,
    user_isAdmin: user.user_isAdmin,
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
    dispatch(updateUser(input, id));
    alert('Usuario actualizado');
    navigate("/admin/users")
  }


    if (Object.entries(user).length > 0) {
    return (
      <div className={styles.divform}>
        <div className={styles.form}>
          <h1>Datos del usuario: </h1>
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <div>
              <label>Nombre:</label>
              <input
                type='text'
                name='user_name'
                value={input.user_name}
                readonly
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type='text'
                name='user_email'
                value={input.user_email}
                readonly
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>Numero de contacto:</label>
              <input
                type='number'
                name='user_phone'
                value={input.user_phone}
                readonly
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label>¿Este usuario es administrador?:</label>
              <input
                type='boolean'
                name='user_isAdmin'
                value={input.user_isAdmin}
                onChange={(e) => handleOnChange(e)}
              />
              {errors.user_isAdmin && (
                <p>{errors.user_isAdmin}</p>
              )}
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

export default UpdateUserAdmin
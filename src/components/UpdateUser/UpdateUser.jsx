import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ERROR, updateUser } from '../../redux/actions';
import ModalResponse from '../ModalResponse/ModalResponse';

export function validate(input) {
  let errors = {};
  if (!input.user_name) {
    errors.user_name = 'Escribe tu nombre de usuario';
  } else if (!/[A-z]/.test(input.user_name)) {
    errors.review_title = 'Escribe tu nombre de usuario';
  }
  if (!input.user_password) {
    errors.user_password = 'Ingresa tu nueva contraseña';
  } else if (input.user_password !== input.user_password_confirm) {
    errors.user_password_confirm =
      'Las contraseñas no coinciden, por favor revisa nuevamente';
  }
  if (!input.user_phone) {
    errors.user_phone = 'Dejanos tu numero de contacto';
  } else if (!/[0-9]/.test(input.user_phone)) {
    errors.user_phone = 'Ingresa un numero de contacto válido';
  } else if (Number(input.user_phone).length > 10) {
    errors.user_phone = 'Ingresa un numero de contacto válido';
  }
  return errors;
}

const UpdateUser = ({ user, id }) => {
  const dispatch = useDispatch();
  const INITIAL_STATE = {
    user_name: user.user_name,
    user_password: '',
    user_password_confirm: '',
    user_phone: user.user_phone,
    user_payment_method: user.user_payment_method,
    user_shipping_address: user.user_shipping_address,
    user_email: user.user_email,
  };
  const [responseBackend, setResponseBackend] = useState(null);
  const [input, setInput] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const { errorAxios } = useSelector((state) => state);
  const [edit, setEdit] = useState(null);
  const [modal, setModal] = useState(null);
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

  async function handleOnSubmit(e) {
    e.preventDefault();
    const res = await dispatch(
      updateUser(input, id, input.user_password_confirm)
    );
    setModal(true);
    setResponseBackend(res.payload.data.msg);
    setTimeout(() => {
      setModal(null);
      setResponseBackend(null);
    }, 2000);
    setTimeout(() => dispatch({ type: ERROR, payload: null }), 3500);
  }
  const inputDates = [
    {
      option: 'Nombre de usuario',
      type: 'text',
      date: user.user_name,
      inputDate: input?.user_name,
      values: 'user_name',
    },
    {
      option: 'Cambiar contraseña',
      type: 'password',
      date: '*********',
      inputDate: input?.user_password,
      values: 'user_password',
    },
    {
      option: 'Numero de contacto',
      type: 'text',
      date: user.user_phone,
      inputDate: input?.user_phone,
      values: 'user_phone',
    },
    {
      option: 'Metodo de pago',
      type: 'text',
      date: user.user_payment_method,
      inputDate: input?.user_payment_method,
      values: 'user_payment_method',
    },
    {
      option: 'Dirección de entrega',
      type: 'text',
      date: user.user_shipping_address,
      inputDate: input?.user_shipping_address,
      values: 'user_shipping_address',
    },
  ];
  const handleEditOption = (index) => {
    if (index === edit) return setEdit(null);
    setEdit(index);
  };
  return (
    <>
      {modal === null ? null : <ModalResponse response={responseBackend} />}
      {Object.values(user).length > 0 ? (
        <div className='update'>
          <div className='update__container'>
            <form className='update__form' onSubmit={(e) => handleOnSubmit(e)}>
              {inputDates.map((dates, index) => (
                <div className='update__div' key={dates.option}>
                  <div className='update__flex'>
                    <label className='update__label'>{dates.option}</label>:
                    {edit === index ? (
                      <>
                        <input
                          className={`${
                            dates.type === 'password'
                              ? 'update__pass'
                              : 'update__input'
                          }`}
                          name={dates?.values}
                          value={dates?.inputDate}
                          type={dates?.type}
                          placeholder={
                            dates?.type === 'password' ? 'Contraseña' : null
                          }
                          onChange={handleOnChange}
                        />
                        {dates?.type === 'password' && (
                          <input
                            className='update__pass'
                            name={'user_password_confirm'}
                            value={input.user_password_confirm}
                            type={dates?.type}
                            placeholder='Nueva contraseña'
                            onChange={handleOnChange}
                          />
                        )}
                      </>
                    ) : (
                      <div>{dates?.inputDate}</div>
                    )}
                  </div>
                  <button
                    className='update__btn'
                    type='button'
                    onClick={() => handleEditOption(index)}
                  >
                    Editar
                  </button>
                </div>
              ))}
              <button className='update__submit' type='submit'>
                Actualizar
              </button>
              {errorAxios !== null ? (
                <div className='update__error'>{errorAxios}</div>
              ) : null}
            </form>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};

export default UpdateUser;

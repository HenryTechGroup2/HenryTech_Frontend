import React from 'react';
import { useState } from 'react';
const INITIAL_STATE = {
  shipping: '',
  address: '',
};
const UpdateInfo = () => {
  const [changeInfo, setChangeInfo] = useState(INITIAL_STATE);
  function handleSubmit() {}
  function handleChange(evt) {
    const { value, name } = evt.currentTarget;
    setChangeInfo({
      ...changeInfo,
      [name]: value,
    });
  }
  return (
    <form className='infop' onSubmit={handleSubmit}>
      <input
        value={changeInfo.shipping}
        onChange={handleChange}
        className='infop__input'
        placeholder='Envío'
        type='text'
      />
      <input
        value={changeInfo.address}
        onChange={handleChange}
        className='infop__input'
        placeholder='Dirección'
        type='text'
      />
      <button className='infop__button'>Cambiar Informacion</button>
    </form>
  );
};

export default UpdateInfo;

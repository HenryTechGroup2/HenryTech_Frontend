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
    <form className='info' onSubmit={handleSubmit}>
      <input
        value={changeInfo.shipping}
        onChange={handleChange}
        className='info__input'
        placeholder='Shipping'
        type='text'
      />
      <input
        value={changeInfo.address}
        onChange={handleChange}
        className='info__input'
        placeholder='Address'
        type='text'
      />
      <button className='info__button'>Change Info</button>
    </form>
  );
};

export default UpdateInfo;

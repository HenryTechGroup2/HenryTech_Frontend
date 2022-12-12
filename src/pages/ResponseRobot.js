import React from 'react';
import { useState } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const ResponseRobot = () => {
  const [change, setChange] = useState('');
  const [response, setResponse] = useState(
    `Hola como estas soy Red y puedes preguntarme algunas dudas si tu duda es muy especifica puedes enviar un mensaje a nuestro administrador.`
  );
  const question = [
    'debito',
    'tarjeta',
    'credito',
    'mercado',
    'paypal',
    'envio',
    'tarda',
    'tiempo',
    'reclamo',
    'reclamar',
    'dañado',
    'daño',
    'roto',
    'sirve',
  ];

  const handleChange = (evt) => {
    const { value } = evt.currentTarget;
    setChange(value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    let message = [];
    question.forEach((leter) => {
      change.split(' ').forEach((value) => {
        if (leter.toLowerCase() === value.toLowerCase()) {
          return (message[0] = leter);
        }
      });
      return false;
    });
    if (message[0] === 'tarda' || message[0] === 'tiempo') {
      return setResponse(
        `Depende mucho de donde vivas pero regularmente no mas de 1 semana`
      );
    }
    if (
      message[0] === 'daño' ||
      message[0] === 'dañado' ||
      message === 'roto' ||
      message === 'sirve'
    ) {
      return setResponse(
        `En ese caso puedes tomar una foto y  video de su funcionalidad nuestros vendedores se encargaran de verlo y decididaran si enviar un nuevo producto`
      );
    }
    if (message[0] === 'reclamar' || message[0] === 'reclamo') {
      return setResponse(
        `Puedes contactarte con nuestro administrador en el chat de la pagina principal para cualquier reclamo`
      );
    }
    if (message[0] === 'paypal' || message[0] === 'mercado') {
      return setResponse(
        `Por ahora no tenemos implementado el metodo de pago ${message[0]}`
      );
    }
    const reponse = `Claro que utilizamos metodos de pago como ${
      message[0] === 'mercado' ? 'mercado pago' : message[0]
    }`;
    if (message.length > 0) return setResponse(reponse);
    return setResponse(
      'Lo siento no encuentro respuesta a tu pregunta fijate si no tienes errores de escritura'
    );
  };
  return (
    <>
      <Header />
      <div className='robot'>
        <div className='robot__container'>
          <img
            src='../assets/responsive/robot.gif'
            alt='Hola'
            className='robot__img'
          />
          <div className='robot__div'>{response}</div>
          <form onSubmit={handleSubmit}>
            <div className='review__msg'>
              <input
                placeholder='Cual es tu duda'
                className='review__input'
                type='text'
                name='review_body'
                value={change}
                onChange={handleChange}
              />

              <button className='review__button' type='submit'>
                <img src='../send.png' alt='' />
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResponseRobot;

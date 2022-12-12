import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
const question = [
  {
    title: '¿Qué productos puedo encontrar en HENRYTECH?',
    description: `  Con nosotros puedes encontrar todo tipo de productos relacionados con
  la tecnología, estamos a la vanguardia con los mejores productos y de
  la mejor calidad.`,
  },
  {
    title: '¿Qué productos puedo encontrar en HENRYTECH?',
    description: `Estamos ubicados en: ...`,
  },
  {
    title: '¿Es seguro comprar en esta tienda?',
    description: ` ¡Claro! Con nosotros https://doctormovil.co/ puedes estar tranquilo y
  hacerlo con toda la confianza. En nuestro sitio web tomamos todas las
  medidas de seguridad para proteger el proceso de pago y tu información`,
  },
  {
    title: '¿Cuáles son los pagos?',
    description: ` Nuestro sitio web recibe los metodos de pago: Tarjetas de crédito
  (Visa, American Express, Mastercard, Diners Club). Tarjetas débito por
  PSE, Nequi o Daviplata`,
  },
  {
    title: '¿Hacen envíos nacionales?',
    description: `Claro que sí, tenemos cobertura en toda Colombia.`,
  },
  {
    title: '¿Cuál es el costo del envío?',
    description: `Nuestros costos de envío varían según tu ubicación, este será
  calculado al momento del Check out`,
  },
  {
    title: '¿Cómo gestionar la garantía de mi producto?',
    description: ` Debes enviar el producto a nuestra tienda o dirigirte personalmente
  explicando el problema del producto, y en las condiciones en que se
  presenta, ejemplo: “mi equipo se recalienta y se apaga cuando lo pongo
  a cargar”.`,
  },
];
const Questions = () => {
  const [open, setOpen] = useState(null);
  const handleClick = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  return (
    <>
      <Header />
      <div className='questions'>
        <h1 className='questions__h1'>Preguntas frecuentes HENRYTECH</h1>
        <p className='questions__text'>
          ¡Hola! Sabemos que es posible que surjan algunas dudas antes de hacer
          una compra y queremos que estés muy seguro de que el paso que vas a
          tomar es totalmente satisfactorio. Por esta razón creamos esta sección
          en donde encontrarás las preguntas más frecuentes y así poderte
          garantizar que la inversión que harás con nosotros sea tu mejor
          decisión.
        </p>
        <div className='questions__div'>
          {question.map((quest, index) => (
            <React.Fragment key={index}>
              <h2 onClick={() => handleClick(index)} className='questions__h2'>
                {quest.title}
              </h2>
              <p className={`questions__p ${open === index ? 'v' : ''}`}>
                {quest.description}{' '}
              </p>
            </React.Fragment>
          ))}
        </div>
        <div className='questions__pos'>
          <Link to={'/preguntas'}>¿Tienes mas dudas?</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Questions;

import ReactDom from 'react-dom';
const ModalEspere = () => {
  const $div = document.getElementById('espera');

  return ReactDom.createPortal(
    <div className='loading'>
      <div className='loader'>
        <div className='loader__container loader__payment'>
          Espera tu compra se esta realizando no salgas de la pagina...
          <div className='spinner spinner__low'></div>
        </div>
      </div>
    </div>,
    $div
  );
};

export default ModalEspere;

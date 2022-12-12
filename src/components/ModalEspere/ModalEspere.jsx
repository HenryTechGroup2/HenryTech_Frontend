import ReactDom from 'react-dom';
const ModalEspere = () => {
  const $div = document.getElementById('espera');
  return ReactDom.createPortal(
    <div className='espera'>
      <div className='espera__div'>
        <div>
          Espera tu compra se esta realizando no salgas de la pagina...{' '}
        </div>
        <div className='spinner'></div>
      </div>
    </div>,
    $div
  );
};

export default ModalEspere;

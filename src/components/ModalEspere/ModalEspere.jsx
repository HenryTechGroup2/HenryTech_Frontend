import ReactDom from 'react-dom';
const ModalEspere = ({ loading }) => {
  const $div = document.getElementById('espera');
  return ReactDom.createPortal(
    <div
      className='espera'
      style={{
        opacity: `${loading ? '1' : '0'}`,
        visibility: `${loading ? 'visible' : 'hidden'}`,
      }}
    >
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

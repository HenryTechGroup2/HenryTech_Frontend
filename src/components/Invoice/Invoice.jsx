import React from 'react';

const Invoice = ({ invoice }) => {
 
  return (
      <div>
          <h4>Numero de factura: {invoice.invoice_id}</h4>      
          <h4>Dirección: {invoice.invoice_shipping}</h4>
          <h4>Total pagado: {invoice.invoice_amount}</h4>
      </div>
  );
};

export default Invoice;

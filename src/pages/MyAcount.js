import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from "../redux/actions.js"
import Card from '../components/Card/Card.jsx';
import Invoice from '../components/Invoice/Invoice.jsx';
import UpdateUser from '../components/UpdateUser/UpdateUser.jsx';


export function MyAcount() {

  const params = useParams()
  const id = params.id
  const dispatch = useDispatch()
  useEffect(() =>
    dispatch(getUser(id)), [])

  const user = useSelector(state => state.user)


  if(Object.entries(user).length>0){
    return (
      <div>
        <div>
          <h1>Bienvenid@ {user.user_name}</h1>
          <h2>Tus favoritos</h2>
          {user.user_favorites?.map((product) => (
            <Card key={product.product_id} product={product} login={true} />
          ))}
          <button>Tu historial de compra</button>
          {user.user_invoice?.map(invoice => (
            <Invoice key={invoice.invoice_id} invoice={invoice} />
          ))}
           <UpdateUser user={user}/>
        </div>
      </div>
    )
  }

}

export default MyAcount;
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { updateUser } from '../../redux/actions';

export function validate(input){    
    let errors={};
    if(!input.user_name){
        errors.user_name= "Escribe tu nombre de usuario"
    }else if(!/[A-z]/.test(input.user_name)){
        errors.review_title = "Escribe tu nombre de usuario"
    }
    if(!input.user_password){
        errors.user_password= "Ingresa tu nueva contraseña"
    }else if (input.user_password !== input.user_password_confirm){
        errors.user_password_confirm = "Las contraseñas no coinciden, por favor revisa nuevamente"
    }
    if(!input.user_phone){
        errors.user_phone= "Dejanos tu numero de contacto"
    }else if(!/[0-9]/.test(input.user_phone)){
        errors.user_phone = "Ingresa un numero de contacto válido"
    }else if(Number(input.user_phone).length>10){
        errors.user_phone = "Ingresa un numero de contacto válido"
    }
    return errors;
}

const UpdateUser = ({user}) => {
    const params = useParams()
    const id = params.id
    const dispatch = useDispatch()

    
        const initialState =  {
            user_name:user.user_name,
            user_password:user.user_password,
            user_password_confirm:user.user_password,
            user_phone:user.user_phone,
            user_payment_method:user.user_payment_method,
            user_shipping_address:user.user_shipping_address
        }
  

    const [input, setInput] = useState(initialState);
    const [errors, setErrors] = useState({})

    function handleOnChange (e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
          }));
    }


    function handleOnSubmit (e){
        e.preventDefault();
            dispatch(updateUser(input,id)) 
            alert ("Tus datos fueron actualizados")    
    }

    if (Object.entries(user).length>0){
  return (
      <div>
          <h1>Actualiza tus datos: {user.user_name} </h1> 
          <form onSubmit={(e)=>handleOnSubmit(e)}>
                <div>
                    <label>Nombre de usuario:</label>
                    <input type="text"
                            name="user_name"
                            value={input.user_name}
                            defaultValue={user.user_name}
                            onChange={(e)=> handleOnChange (e)}
                            />
                            {errors.user_name && (<p>{errors.user_name}</p>)} 
                </div>
                <h2>Cambia tu contraseña:</h2>
                <div>
                    <label>Nueva Contraseña:</label>
                    <input type="password"
                            name="user_password"
                            value={input.user_password}
                            defaultValue={user.user_password}
                            onChange={(e)=> handleOnChange (e)}
                            />
                            {errors.user_password && (<p>{errors.user_password}</p>)} 
                </div>
                <div>
                    <label>Confirma tu Contraseña:</label>
                    <input type="password"
                    name="user_password_confirm"
                    value={input.user_password_confirm}
                    defaultValue={user.user_password}
                    onChange={(e)=> handleOnChange (e)}/>
                    {errors.user_password_confirm && (<p>{errors.user_password_confirm}</p>)} 
                </div>
                <div>
                    <label>Numero de contacto:</label>
                    <input type="number" 
                            name="user_phone"
                            value={input.user_phone}
                            defaultValue={user.user_phone}
                            onChange={(e)=> handleOnChange (e)}
                            />
                            {errors.user_phone && (<p>{errors.user_phone}</p>)} 
                </div>
                <div>
                    <label>Método de pago:</label>
                    <input type="text" 
                            name="user_payment_method"
                            value={input.user_payment_method}
                            defaultValue={user.user_payment_method}
                            onChange={(e)=> handleOnChange (e)}
                            />
                </div>
                <div>
                    <label>Dirección de entrega:</label>
                    <input type="text" 
                            name="user_shipping_address"
                            value={input.user_shipping_address}
                            defaultValue={user.user_shipping_address}
                            onChange={(e)=> handleOnChange (e)}
                            />
                </div>
                <button type="submit" 
                disabled={Object.entries(errors).length===0? false:true}
                >Actualizar</button>
            </form>
  
      </div>
  )};
};

export default UpdateUser;
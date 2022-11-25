import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { productByname } from "../redux/actions.js"

export default function ProductByName() {

    let dispatch = useDispatch()
    let [title, setTitle] = useState('')

    let handleOnChange = function (e) {
        e.preventDefault()
        setTitle(e.target.value)

    }

    let handleOnClick = function (e) {
        e.preventDefault()
        dispatch(productByname(title))
    }

    return (
        <div>
            <input type='text' placeholder="nombre producto" onChange={(e) => handleOnChange(e)} />
            <input type='submit' onClick={(e) => handleOnClick(e)} />
        </div>
    )
}
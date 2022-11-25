import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { filterByPirce } from "../redux/actions.js"


export default function GetFilters() {

    let [input, setInput] = useState(' ')

    let dispatch = useDispatch()

    function priceOnClick(e) {
        e.preventDefault()
        dispatch(filterByPirce(input))
        setInput(' ')
    }

    let priceOnChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }
    return (
        <div>
            <div>
                <input type='text' placeholder="filtra por precio" onChange={(e) => priceOnChange(e)} />
                <input type='submit' onClick={(e) => priceOnClick(e)} />
            </div>
            <div>
                <input type='text' placeholder="filtra por categoria" />
                <input type='submit' />
            </div>
        </div>
    )
}






// precio - categoria - marca
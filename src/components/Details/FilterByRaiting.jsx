import React from "react"
import { useDispatch } from "react-redux"
import { filterByRaiting } from '../../redux/actions.js'



export default function FilterByRaiting() {


    let dispatch = useDispatch()

    let handleOnRaiting = (e) => {
        e.preventDefault();
        dispatch(filterByRaiting(e.target.value))
    }

    return (
        <div>
            <div>
                <p>filtro por raiting</p>
                <button value={1} onClick={e => handleOnRaiting(e)}>☆</button>
                <button value={2} onClick={e => handleOnRaiting(e)}>☆</button>
                <button value={3} onClick={e => handleOnRaiting(e)}>☆</button>
                <button value={4} onClick={e => handleOnRaiting(e)}>☆</button>
                <button value={5} onClick={e => handleOnRaiting(e)}>☆</button>
            </div>
            <div>
            </div>
        </div>
    )
}
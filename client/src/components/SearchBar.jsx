import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { getRecipesName } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [ input, setInput ] = useState('')

    function handleChangeInput(e){
        e.preventDefault()
        setInput(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
    try {
        dispatch(getRecipesName(input));
    } 
    catch (error) {            
        return error;
    }
    setInput('')
    }

    return(
        <div className='navbarSearch'>
            <input className='navbarInput' placeholder='Search recipe or diet type..' type='text' value={input} onChange={e => handleChangeInput(e)} ></input>
            <button className='NavbarButton' type='submit' onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}
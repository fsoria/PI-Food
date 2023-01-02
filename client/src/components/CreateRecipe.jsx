import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import { Link } from "react-router-dom";


function validate(input){
    let error = {}
    if (!input.name){
        error.name = 'A name is required'
    }
    if (!input.summary){
        error.summary = 'A summary is required'
    }
    if (typeof(input.healthScore) !== 'number'){
        error.healthScore = 'The healtscore should be a number'
    }
    if (Number.isInteger(input.healthScore) === false){
        error.healthScore = 'The healtscore should be an integer'
    }
    if (input.healthScore>100){
        error.healthScore = 'The healtscore must be less than 100'
    }
    return error
}

export default function CreateRecipe(){
    const dispatch = useDispatch()
    const diets = useSelector((state) => (state.diets))
    const [ error, setError ] = useState({})

    const [ input, setInput] = useState({
        id:'',
        name: '',
        summary: '',
        healthScore:'',
        step: '',
        diets: []

    })

    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [ e.target.name ]: e.target.value
        })
        setError(validate({
            ...input,
            [ e.target.name ]: e.target.value
        }))
    }
    
    function handleSelect(e){
        setInput({
            ...input,
            diets: [ ...input.diets, e.target.value ]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input))
        alert('Recipe created')
        setInput({
            id:'',
            name: '',
            summary: '',
            healthScore:'',
            step: '',
            diets: []
        })
    }


    return(

    <div>
        <Link to='/home'><button>Back to recipes</button></Link>
        <h3>Create your recipe</h3>
        <form onSubmit={e => handleSubmit(e)}>
            <div>
                <label>Name:</label>
                <input type='text' value={input.name} name='name' onChange={e => handleChange(e)}/>
                if(error.name?){(<p className="error">{error.name}</p>)}
            </div>
            <div>
                <label>Sumary:</label>
                <input type='type' value={input.diets} name='diets'onChange={e => handleChange(e)}/>
                error.summary?<p className="error">{error.summary}</p>
            </div>
            <div>
                <label>Image:</label>
                <input type='text' value={input.image} name='image'onChange={e => handleChange(e)}/>
            </div>
            <div>
                <label>Healt score:</label>
                <input type='nunmber' value={input.healthScore} name='healtScore'onChange={e => handleChange(e)}/>
            </div>
            <select onChange={e => handleSelect(e)}>
                {diets.map(e => (
                    <option value={e.name}>{e.name}</option>
                ))}
            </select>
        </form>
        <ul>{input.diets.map(e => e + ',')}</ul>
        <button type="Submit">Create recipe</button>

    </div>
    )
}
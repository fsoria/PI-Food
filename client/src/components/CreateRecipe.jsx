import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import { Link } from "react-router-dom";


function validate(input){
    let error = {}
    if(!input.name){error.name = 'Add a name to your recipe'}
    if(!input.summary){error.summary = 'Add a summary of your recipe'}
    if(input.healthScore < 0 || input.healthScore > 100){error.healthScore = 'The healtscore should be a number between 1 and 100'}
    if(!input.steps){error.steps = 'Add the steps for your recipe'}
    if(!input.diets.length){error.diets = 'You must select at least one diet type'}
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
        steps: '',
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
            steps: '',
            diets: []
        })
    }

    function handleDelete(e){
        setInput({
        ...input,
         diets: input.diets.filter( d => d !== e)
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
                {error.name && (<span className="error">{error.name}</span>)}
            </div>
            <div>
                <label>Summary:</label>
                <input type='text' value={input.summary} name='summary'onChange={e => handleChange(e)}/>
                {error.summary && (<span className="error">{error.summary}</span>)}
            </div>
            <div>
                <label>Image:</label>
                <input type='text' value={input.image} name='image'onChange={e => handleChange(e)}/>
                {error.image && (<span className="error">{error.image}</span>)}
            </div>
            <div>
                <label>Steps:</label>
                <textarea type="text" value={input.steps}  name="steps" rows="4" cols="40" onChange={e => handleChange(e)}/>
                {error.steps && (<span className="error">{error.steps}</span>)}
            </div>
            <div>
                <label>Healt score:</label>
                <input type='number' value={input.healthScore} name='healthScore'onChange={e => handleChange(e)}/>
                {error.healthScore && (<span className="error">{error.healthScore}</span>)}
            </div>
            <select onChange={e => handleSelect(e)}>
                {diets.map(e => (
                    <option value={e.name}>{e}</option>
                ))}
            </select>
        </form>

        {input.diets.map(e => {
            return(
            <div className="formDiets">
                <span>{e} <button className="buttonXdiets" onClick={() => handleDelete(e)}>X</button> </span>
            </div>
        )}
        )}
    
        <button type="Submit">Create recipe</button>

    </div>
    )
}
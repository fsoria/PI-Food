import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import { Link, useHistory } from "react-router-dom";
import './CreateRecipe.css'


function validate(input){
    let error = {}
    if(!input.name.trim()){error.name = 'Add a name to your recipe'}
    else if(parseInt(input.name)){error.name = 'Invalid name, should contain at least one letter at the beginning'}
    if(!input.image){error.image = 'Upload an image'}
    if(!input.summary.trim()){error.summary = 'Add a summary of your recipe'}
    else if(parseInt(input.summary)){error.summary = 'Summary should contain at least one letter at the beginning'}
    if(input.healthScore < 0 || input.healthScore > 100){error.healthScore = 'The healtscore should be a number between 1 and 100'}
    if(!input.steps){error.steps = 'Add the steps for your recipe'}
    if(!input.diets.length){error.diets = 'You must select at least one diet type'}
    return error
}

export default function CreateRecipe(){
    const dispatch = useDispatch()
    const history = useHistory()
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
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
        if (Object.values(error).length > 0) {
            alert("Please complete the information required");
        }
        else if (!Object.values(error).length
            && input.name  
            && input.image 
            && input.summary  
            && input.healthScore 
            && input.steps   
            && input.diets) 
            {
                dispatch(postRecipe(input))
                setInput({
                    id:'',
                    name: '',
                    summary: '',
                    healthScore:'',
                    steps: '',
                    diets: []
                })

            }
            alert('Recipe created successfully!')
            // else {
            //     alert('Recipe not created');
            //     return;
            // }
            history.push('/home')
    }


    function handleDelete(e){
        setInput({
        ...input,
         diets: input.diets.filter( d => d !== e)
        })
    }
    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch])

    return(

    <div className="fondoCreate">
        <div className='containerCreate'>
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
                {error.diets && (<span>{error.diets}</span>)}
            </select>
            <div>
            <button className="buttonCreate" type="submit">Create recipe</button>
            </div>
        </form>

        {input.diets.map(e => {
            return(
                <div className="formDiets">
                <span>{e} <button className="buttonXdiets" onClick={() => handleDelete(e)}>X</button> </span>
            </div>
        )}
        )}
    </div>
    </div>
    )
}

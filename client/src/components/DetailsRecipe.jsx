import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails, cleanRecipeDetails, getRecipes} from "../actions";
import { useParams } from "react-router-dom";
import './DetailsRecipe.css'
import { Link } from 'react-router-dom'


export default function DetailsRecipe(){
    const dispatch = useDispatch()
    const { id } = useParams()
    

    useEffect( () => {
        dispatch(getRecipeDetails(id))
        return () => {
            dispatch(cleanRecipeDetails([]))
        }
    }, [dispatch, id])

    // function handleClick(e){
    //     e.preventDefault()
    //     dispatch(getRecipes(id))
    // }

    const detailRecipe = useSelector(state => state.details)

    return(
    <div className="fondoDetails">
           
            {detailRecipe.length>0?
            <div>
            <div>
            <Link to='/home'><button className="buttonBack" >Back to home</button></Link>
            </div>
            <div className="conteinerDetails">
            <h1>{detailRecipe[0].name}</h1>
            <img className="detailImage" src={detailRecipe[0].image} alt='not found'/>
            <h3>Healt score: {detailRecipe[0].healthScore}</h3> 
            <h4>Diets: {!detailRecipe[0].createInDB? detailRecipe[0].diets + ', ' : detailRecipe[0].diets.map(d => d + ', ')} </h4> 
            <p className="detailSummary">Summary: {detailRecipe[0].summary}</p>
            <h5> Steps: {!detailRecipe[0].createInDB? detailRecipe[0].steps.map(s => s.map(e=> <ul><li>{e.step}</li></ul>)) : detailRecipe[0].steps}</h5>
{/* 
            <h3>Diet type: {detailRecipe[0].diets + ','}</h3> */}
            </div>
            </div>:
            <div className="fondoLoading" >Loading...</div>
        }

    </div>
        )  
    }
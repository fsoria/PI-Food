import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails, cleanRecipeDetails } from "../actions";
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

    const detailRecipe = useSelector(state => state.details)

    return(
    <div className="fondoDetails">
           
            {detailRecipe.length>0?
            <div>
            <div>
            <Link to='/home'><button className="buttonBack">Back to home</button></Link>
            </div>
            <div className="conteinerDetails">
            <h1>{detailRecipe[0].name}</h1>
            <img className="detailImage" src={detailRecipe[0].image} alt='not found'/>
            <h3>Diet type: {detailRecipe[0].diets + ','}</h3>
            <h3>Healt score: {detailRecipe[0].healthScore}</h3>
            {/* <p>Steps :</p> */}
            <p className="detailSummary">Summary: {detailRecipe[0].summary}</p>
            </div>
            </div>:
            <div className="fondoLoading" >Loading...</div>
        }

    </div>
        )  
    }
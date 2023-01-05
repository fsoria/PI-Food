import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../actions";
import { useParams, useLocation } from "react-router-dom";
import './DetailsRecipe.css'



export default function DetailsRecipe(){
    const dispatch = useDispatch()
    const { id } = useParams()
    const location = useLocation()

    useEffect( () => {
        dispatch(getRecipeDetails(id))
    }, [id, dispatch])

    const detailRecipe = useSelector(state => state.details)

    return(
    <div className="fondoDetails">
  
            <button onClick={()=> location('/home')} >Back to home</button>
            {detailRecipe.length>0?
            <div>
            <h1>{detailRecipe[0].name}</h1>
            <img className="detailImage" src={detailRecipe[0].image} alt='not found'/>
            <h3>Diet type: {detailRecipe[0].diets}</h3>
            <h3>Healt score: {detailRecipe[0].healthScore}</h3>
            <p>Summary: {detailRecipe[0].summary}</p>
            {/* <h3>{detailRecipe[0].steps}</h3> */}
            </div>:
            <div className="fondoLoading">Loading...</div>
        }

    </div>
        )  
    }
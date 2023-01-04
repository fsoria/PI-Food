import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../actions";
import { Link, useParams } from "react-router-dom";


export default function DetailsRecipe(){
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect( () => {
        dispatch(getRecipeDetails(id))
    }, [id, dispatch])

    const detailRecipe = useSelector(state => state.details)

    return(
        <div>
            <h3>Details Recipe</h3>
            {detailRecipe.length>0?
            <div>
            <h1>{detailRecipe[0].name}</h1>
            <img src= {detailRecipe[0].image}/>
            <h2>{detailRecipe[0].summary}</h2>
            <h2>{detailRecipe[0].diets}</h2>
            <span>{detailRecipe[0].healthScore}</span>
            {/* <h3>{detailRecipe[0].steps}</h3> */}
            </div>:
            <div>Loading...</div>
            }
        </div>
        )  
    }
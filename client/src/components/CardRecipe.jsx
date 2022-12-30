import React from "react";
import { Link } from 'react-router-dom';
import './CardRecipe.css'

export default function CardRecipe({ name, image, diets, id }){
    return (
        <div>
            <Link to={'/recipe/' + id}>
            <h3>{name}</h3>
            <img className= 'cardRecipe' src= {image} alt='Image not found'/>
            <h5>{diets}</h5>
            </Link>
        </div>
    )
}
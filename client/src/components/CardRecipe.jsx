import React from "react";
import { Link } from 'react-router-dom';
import './CardRecipe.css'

export default function CardRecipe({ name, image, diets, id, healthScore }){
    return (
        <div className="card">
            <Link to={`/recipes/${id}`}>
            <h3>{name}</h3>
            <img className= 'cardImage' src= {image} alt='Not found'/>
            </Link>
            <div>
                {diets?.map(e =>
                <h5>{e}</h5>)}
            </div> 
            <span>HealthScore:{healthScore}</span>
        </div>
    )
}
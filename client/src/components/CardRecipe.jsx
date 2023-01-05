import React from "react";
import './CardRecipe.css'

export default function CardRecipe({ name, image, diets, id, healthScore }){
    return (
        <div className="card">
            <h3>{name}</h3>
            <img className= 'cardImage' src= {image} alt='Not found'/>
            <div>
                {diets?.map(e =>
                <h5 key={e}>{e}</h5>)}
            </div> 
            <span>HealthScore:{healthScore}</span>
        </div>
    )
}
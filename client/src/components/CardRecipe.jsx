import React from "react";

export default function CardRecipe({ name, image, diets }){
    return (
        <div>
            <h3>{name}</h3>
            <image src={image} alt='Image not found'/>
            <h5>{diets}</h5>
        </div>
    )
}
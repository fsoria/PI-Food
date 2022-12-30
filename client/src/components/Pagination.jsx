import React from "react";
import './Pagination.css'

export default function Pagination({ recipesPerPage, allRecipes, pagination }){
    const pageNumbers = []
    
    for (let i=0; i<= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
    <nav>
        <div className='pagination'>
                {pageNumbers?.map(paged =>{(
                <button className = 'paginationBotton' onClick={() => pagination(paged)}>{paged}</button> )})}
        </div>
    </nav>
)}
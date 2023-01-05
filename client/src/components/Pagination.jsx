import React from "react";
import './Pagination.css'

export default function Pagination({ recipesPerPage, allRecipes, pagination }){
    const pageNumbers = []
    
    for (let i=1; i<= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <div className='pagination'>
                {pageNumbers?.map(paged =>
                <button key={paged} className = 'paginationBotton' onClick={() => pagination(paged)}>{paged}</button> )}
        </div>
 
)}
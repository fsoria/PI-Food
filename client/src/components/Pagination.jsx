import React from "react";

export default function Pagination({ recipesPerPage, allRecipes, pagination }){
    const pageNumber = []
    
    for (let i=1; i<= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul className="pagination">
                {pageNumber?.map(number =>{(
                    <li className="number" key={number}>
                    <a onClick={() => pagination(number)}>{number}</a>
                    </li>
                )})}
            </ul>
        </nav>
    )
}
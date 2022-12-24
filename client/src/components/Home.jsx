import React from 'react'
import { useState, useEffect  } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getRecipes } from '../actions'
import { Link } from 'react-router-dom'
import CardRecipe from './CardRecipe'
import Pagination from './Pagination'



export default function Home(){

const dispatch = useDispatch()

const allRecipes = useSelector((state) => state.recipes)
const [ currentPage, setCurrentPage ] = useState(1)
const [ recipesPerPage, setRecipesPerPage ] = useState(9)
const indexOfLastRecipe = currentPage * recipesPerPage
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
const currentRecipe = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)

const pagination = (pageNumber) =>{
    setCurrentPage(pageNumber)
}



useEffect( () => {
    dispatch(getRecipes())
    },[dispatch])

function handleClick(e){
    e.preventDefault()
    dispatch(getRecipes())

}

return(

        <div>
        <Link to= '/recipes'>
            Create recipe
        </Link>
        <h1>Recipe</h1>
        
        <button onClick= {(e=> handleClick(e))}>
            Back to all recipes
        </button>
        <div>
             <select>
                <option value= 'dairy free'>Dairy free</option>
                <option value= 'gluten free'>Gluten free</option>
                <option value= 'lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                <option value= 'vegan'>Vegan</option>
                <option value= 'pescatarian'>Pescatarian</option>
                <option value= 'fodmap firendly'>Fodmap firendly</option>
                <option value= 'whole 30'>Whole 30</option>
                <option value= 'primal'>Primal</option>
                <option value= 'paleolithic'>Paleolithic</option>
                <option value= 'ketogenic'>Ketogenic</option>
            </select>
            <select>
                <option value= 'asc'>A-Z</option>
                <option value= 'desc'>Z-A</option>
            </select>
            <Pagination
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length}
            pagination = {pagination}
            />
            <div>
            {currentRecipe?.map(e => {
            return(
            <Link to = '/home'>
            <CardRecipe name={e.name} image={e.image} diets={e.diets}/>
            </Link>)
         })}
         </div>
        </div>
    </div>
  
)}

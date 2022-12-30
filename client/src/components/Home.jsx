import React from 'react'
import { useState, useEffect  } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getRecipes, getDiets, filterByDiet} from '../actions'
import { Link } from 'react-router-dom'
import CardRecipe from './CardRecipe'
import Pagination from './Pagination'
import './Home.css'
import './Pagination.css'



export default function Home(){

const dispatch = useDispatch()

const allRecipes = useSelector((state) => state.recipes)
const allDiets = useSelector((state) => state.diets)
const [ page, setPage ] = useState(1)
const [ recipesPerPage, setRecipesPerPage ] = useState(9)
const lastRecipe = page * recipesPerPage // 1 * 9 = 9
const firstRecipe = lastRecipe - recipesPerPage // 9 - 9 = 0
const recipesPage = allRecipes.slice(firstRecipe,lastRecipe)

const pagination = (pageNumber) =>{
    setPage(pageNumber)
}

useEffect( () => {
    dispatch(getRecipes())
    dispatch(getDiets())
    },[dispatch])

function handleClick(e){
    e.preventDefault()
    dispatch(getRecipes())
}

function handleFilterbyDiets(e){
    dispatch(filterByDiet(e.target.value))
}

return(

    <div className='home'>
            <div className='navbar'>
             <Link className='recipeHome' to= '/recipes'>Henry Food</Link>
             <div className='navbarSearch'>
                <input className='navbarInput' placeholder='Search recipe or diet type..' type='text'></input>
                <button className='NavbarButton' type='submit'>Search</button>
                <div className='recipeCreate'>
                    <Link to= '/recipes'>Create recipe</Link>
                </div>
                <div className='recipeFilter'>
                    <select onChange={e => handleFilterbyDiets(e)}>
                        <option value= 'all diets'>All diets</option>
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
                </div>
                <button className='recipesBack' onClick= {(e=> handleClick(e))}>Back to all recipes</button>
            </div>
            <Pagination
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length}
            pagination = {pagination}
            />

            <div className='allRecipes'>
            {recipesPage?.map(e => {
                return(
                <div className='cardgrid'>
                    <Link to = {`/home/${e.id}`}>
                        <CardRecipe 
                        name={e.name} 
                        image= {e.image} 
                        diets={e.diets} 
                        id={e.id}/>
                    </Link>
                </div>
            )})}
            </div>
        </div>
    </div>
)}

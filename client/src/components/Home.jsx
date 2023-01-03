import React from 'react'
import { useState, useEffect  } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getRecipes, getDiets, filterByDiet, orderByName, orderByHealthScore} from '../actions'
import { Link } from 'react-router-dom'
import CardRecipe from './CardRecipe'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import './Home.css'
import './Pagination.css'



export default function Home(){

const dispatch = useDispatch()

const allRecipes = useSelector((state) => state.recipes)
const allDiets = useSelector((state) => state.diets)
const [ page, setPage ] = useState(1)
const [ recipesPerPage, setRecipesPerPage ] = useState(9)
const [ order, setOrder] = useState('')
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
    setPage(1)
}

function handleFilterbyDiets(e){
    dispatch(filterByDiet(e.target.value))
}

function handleSortName(e){
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setPage(1)
    setOrder(e.target.value)
}

function handleSortHealth(e){
    e.preventDefault()
    dispatch(orderByHealthScore(e.target.value))
    setPage(1)
    setOrder(e.target.value)
}

return(

    <div className='home'>
        <div className='navbar'>
                <div className='recipeHome'>
                    <Link to= '/recipes'>Henry Food</Link>
                 </div>
                <SearchBar/>
                <div className='recipeCreate'>
                    <Link to= '/recipes'>Create recipe</Link>
                </div>
            <div className='totalFilters'>
                <span>Order by</span>
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
                </div>
                <div className='recipeOrderName'>
                    <select onChange={e => handleSortName(e)}>
                        <option value= 'asc'>A-Z</option>
                        <option value= 'desc'>Z-A</option>
                    </select>
                </div>
                <div className='recipeOrderHealth'>
                    <select onChange={e => handleSortHealth(e)}>
                        <option value= 'asc'>Ascendent</option>
                        <option value= 'desc'>Descendent</option>
                    </select>
                </div>
            </div>
                <button className='recipesBack' onClick= {e => handleClick(e)}>Back to all recipes</button>
                <Pagination recipesPerPage = {recipesPerPage} allRecipes = {allRecipes.length} pagination = {pagination}/>
        </div>
            <div className='allRecipes'>
                {recipesPage?.map(e => {
                    return(
                    <div className='cardgrid'>
                        <Link to={'/home/'+ e.id}>
                        <CardRecipe  
                        name={e.name} 
                        image= {e.image} 
                        diets={e.diets}
                        healthScore={e.healthScore}
                        id={e.id}/>
                        </Link>
                    </div>
                )})}
            </div>
    </div>
)}

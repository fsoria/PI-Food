import React from 'react'
import { useState, useEffect  } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getRecipes, getDiets, filterByDiet, filterCreated, orderByName, orderByHealthScore, cleanAllFilters, changeCurrentPage} from '../actions'
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
const page = useSelector(state => state.currentPage)
const [ /*order*/, setOrder] = useState('')

// paginado
const recipesPerPage = 9
const lastRecipe = page * recipesPerPage // 1 * 9 = 9
const firstRecipe = lastRecipe - recipesPerPage // 9 - 9 = 0
const recipesPage = allRecipes.slice(firstRecipe,lastRecipe)

useEffect( () => {
    if(!allRecipes.length) dispatch(getRecipes())
    if(!allDiets.length) dispatch(getDiets())
},[]) // eslint-disable-line react-hooks/exhaustive-deps

function handleClick(e){
    e.preventDefault()
    dispatch(cleanAllFilters())
}

 function handleFilterCreated(e){
     e.preventDefault();
     dispatch(filterCreated(e.target.value));
     dispatch(changeCurrentPage(1));
     setOrder(e.target.value)}

function handleFilterbyDiets(e){
    dispatch(filterByDiet(e.target.value))
    dispatch(changeCurrentPage(1));
}

function handleSortName(e){
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setOrder(e.target.value)
}

function handleSortHealth(e){
    e.preventDefault()
    dispatch(orderByHealthScore(e.target.value))
    setOrder(e.target.value)
}

return(
    <div className='fondoHome'>
    <div>
    <Link to= '/recipes' className='CreateRecipe' >Create recipe</Link>
    </div>
        <div className='navbar'>
        <SearchBar/>
             <div className='filters'>
                <span>Filter by</span>
                    <select onChange={(e) => handleFilterbyDiets(e)}>
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
                        <option value= 'Other'>Other</option>
                    </select>
                </div>   
            <div className='order'>
                <span>Order by</span>
                    <select onChange={e => handleSortName(e)}>
                        <option value= 'asc'>A-Z</option>
                        <option value= 'desc'>Z-A</option>
                    </select>
                    <select onChange={e => handleSortHealth(e)}>
                        <option value= 'asc'>Healt score</option>
                        <option value= 'asc'>Ascendent</option>
                        <option value= 'desc'>Descendent</option>
                    </select>
            </div>
            <div className='filterByRecipes'>
                <span>Created/Existent</span>
                <select onChange={e => handleFilterCreated(e)}>
                 <option value='All'>All</option>
                 <option value='Created'>Created</option>
                 <option value='Api'>Existent</option>
                </select>
            </div> 
            <div className='Pagination'>
                <Pagination recipesPerPage = {recipesPerPage} allRecipes = {allRecipes.length} />
             </div>
             <div className='buttonsBackCreate'>
                <button className='recipesBack' onClick= {e => handleClick(e)}>Back to all recipes</button>
            </div>
        </div>
            <div className='allRecipes'>
                {recipesPage?.map(e => {
                    return(
                    <Link to={`/recipes/${e.id}`} key={e.id}>
                        <div className='cardgrid'>
                            <CardRecipe
                                name={e.name} 
                                image= {e.image} 
                                diets={e.diets}
                                healthScore={e.healthScore}
                                id={e.id}
                            />
                        </div>
                    </Link>
                )})}
            </div>
    </div>
)}

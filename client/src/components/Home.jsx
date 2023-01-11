import React from 'react'
import { useState, useEffect  } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getRecipes, getDiets, filterByDiet, filterCreated, orderByName, orderByHealthScore} from '../actions'
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
const [ recipesPerPage, /*setRecipesPerPage*/ ] = useState(9)
const [ /*order*/, setOrder] = useState('')
const lastRecipe = page * recipesPerPage // 1 * 9 = 9
const firstRecipe = lastRecipe - recipesPerPage // 9 - 9 = 0
const recipesPage = allRecipes.slice(firstRecipe,lastRecipe)

const pagination = (pageNumber) =>{
    setPage(pageNumber)
}

useEffect( () => {
    if(!allRecipes.length) dispatch(getRecipes())
    if(!allDiets.length) dispatch(getDiets())
    },[]) 

function handleClick(e){
    e.preventDefault()
    dispatch(getRecipes())
    setPage(1)
}

 function handleFilterCreated(e){
     e.preventDefault();
     dispatch(filterCreated(e.target.value));
     setPage(1);
     setOrder(e.target.value)}

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
    <div className='fondoHome'>
    <div>
    <Link to= '/recipes' className='CreateRecipe' >Create recipe</Link>
    </div>
        <div className='navbar'>
        <SearchBar/>
             <div className='filters'>
                <span>Filter by</span>
                    <select onChange={(e) => handleFilterbyDiets(e)}>
                        <option>Diet type</option>
                        <option value='All'>All</option>
                        {allDiets.map((e) => (
                        <option>{e}</option>))}
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
                <Pagination recipesPerPage = {recipesPerPage} allRecipes = {allRecipes.length} pagination = {pagination} page = {page}/>
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

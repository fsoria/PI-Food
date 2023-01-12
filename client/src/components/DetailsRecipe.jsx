import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails, cleanRecipeDetails, getRecipes, cleanAllFilters } from "../actions";
import { useParams } from "react-router-dom";
import './DetailsRecipe.css'
import { Link } from 'react-router-dom'
import { deleteRecipe } from '../helpers/delete'
import { useHistory } from 'react-router-dom';



export default function DetailsRecipe(){
    const dispatch = useDispatch()
    const { id } = useParams()
    const detailRecipe = useSelector(state => state.details)
    const history = useHistory()
    

    useEffect( () => {
        dispatch(getRecipeDetails(id))
        return () => {
            dispatch(cleanRecipeDetails([]))
        }
    }, [dispatch, id])

    const handleDelete = () => {
        deleteRecipe(id);
        dispatch(getRecipes())
        dispatch(cleanAllFilters())
        history.push('/home');
    };


    return(
    <div className="fondoDetails">
               
            { detailRecipe.length > 0
                ?
                <div>
                    <div><Link to='/home'><button className="buttonBack" >Back to home</button></Link></div>
                    <div className="conteinerDetails">
                        <h1>{detailRecipe[0].name}</h1>
                        <img className="detailImage" src={detailRecipe[0].image} alt='not found'/>
                        {!detailRecipe[0].createInDB && <button onClick={handleDelete}>ELIMINAR</button>}      
                        <h3>Healt score: {detailRecipe[0].healthScore}</h3> 
                        {
                            !detailRecipe[0].createInDB
                            ?
                            <div>
                                <h4>Diets: {detailRecipe[0].diets + ', '}</h4> 
                                <h5>Steps: {detailRecipe[0].steps?.map(s => s.map((e,i) => <ul key={i}><li>{e.step}</li></ul>))}</h5>
                            </div>                   
                            :
                            <div>
                                {/* <h4>Diets: {detailRecipe[0].diet.map(d => d + ', ')}</h4> */}
                                <h5>Steps: {detailRecipe[0].steps} </h5>
                            </div> 
                        }
                        <p className="detailSummary">Summary: {detailRecipe[0].summary}</p>
                        {/* <h3>Diet type: {detailRecipe[0].diets + ','}</h3> */}
                    </div>
                </div>
                :
                <div className="fondoLoading" >Loading...</div>
            }

    </div>
        )  
    }
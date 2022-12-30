import axios from 'axios'


export function getRecipes(){
    return async function (dispatch){
        return await fetch('http://localhost:3001/recipes')
        .then(response => response.json())
        .then((json) =>{
        return dispatch({
            type:'GET_RECIPES',
            payload: json
        })
    })
}}

export function getDiets(){
    return async function (dispatch){
        return await fetch('http://localhost:3001/diets')
        .then(response => response.json())
        .then((json) =>{
        return dispatch({
            type: 'GET_DIETS',
            payload: json
        })
        })
    }
}

export function getRecipe(id) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: 'GET_RECIPE', 
                payload: response.data})
        } catch {
            return alert ('Recipe Not Found')
        }
    }
}

export function filterByDiet(payload){
    return{
        type: 'FILTER_BY_DIET',
        payload
    }
}
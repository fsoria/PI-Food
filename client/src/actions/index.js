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

export function getRecipesName(name){
    return async function(dispatch){
        try{
            const json = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: 'GET_RECIPES_NAME',
                payload: json.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}

export function getDiets(){
    return async function (dispatch){
       return await fetch('http://localhost:3001/diets')
       .then(response => response.json())
       .then((json) =>{
           return dispatch({ 
            type: 'GET_DIETS', 
            payload: json.map(e => e.name)
       })
    })
}}

export function postRecipe(payload){
    return async function(dispatch){
    const json = await axios.post('http://localhost:3001/recipes', payload)
    return json
    }
}

export function filterByDiet(payload){
    return{
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'FILTER_BY_NAME',
        payload
    }
}

export function orderByHealthScore(payload){
    return{
        type: 'FILTER_BY_HEALTHSCORE',
        payload
    }
}
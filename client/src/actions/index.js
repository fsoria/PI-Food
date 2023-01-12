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


export function getRecipeDetails(id){
    return async function(dispatch) {
        try {
        const json = await axios.get('http://localhost:3001/recipes/'+ id)
        return dispatch({
            type: 'GET_RECIPE_DETAILS',
            payload: json.data
        })}
        catch(error){
            console.log(error)
        }
    }
}

export function cleanRecipeDetails(payload) {
    return (dispatch) => {
        dispatch({ type: 'CLEAN_RECIPE_DETAILS', payload})
    }
};

export function postRecipe(payload){
    return (dispatch) => {
        return axios.post('http://localhost:3001/recipes', payload)
        .then(res => console.log(res))
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
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

export function cleanAllFilters(){
    return dispatch => {
        dispatch({ type: 'CLEAN_FILTERS' })
    }
};

export const changeCurrentPage = payload => {
    return dispatch => {
        dispatch({ type: 'CURRENT_PAGE', payload})
    }
};
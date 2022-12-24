import axios from 'axios'


export function getRecipes(){
    return function (dispatch){
        axios.get('http://localhost:3001/recipes').then(res =>{
        return dispatch({
            type:'GET_RECIPES',
            payload: res.data
        })
    })
}}
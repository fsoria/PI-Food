const initialState = {
    recipes : [],
    diets : [],
    allRecipes : [],
    allDiets: []
    
}

function rootReducer( state= initialState, action){
    switch (action.type){
        case'GET_RECIPES':
        return {
            ...state, 
            recipes: action.payload,
            allRecipes: action.payload
        }
        case'GET_DIETS':
        return {
            ...state, 
            diets: action.payload,
            allDiets: action.payload
        }
        case 'FILTER_BY_DIET':
        const totalDiets = state.diets
        const dietFiltered = action.payload === 'all diets'? totalDiets : totalDiets.filter(e => e.diets === action.payload)
        return{
            ...state,
            allDiets: dietFiltered
        }
    
        default: return state
    }
}


export default rootReducer;
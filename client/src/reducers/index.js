const initialState = {
    currentPage: 1,
    recipes : [],
    diets : [],
    allRecipes : [],
    details: []    
}

function rootReducer( state= initialState, action){
    switch (action.type){
        case'GET_RECIPES':
        return {...state, recipes: action.payload, allRecipes: action.payload}

        case'GET_RECIPES_NAME':
        return {...state, recipes: action.payload}

        case'GET_DIETS':
        return {...state, diets: action.payload, allDiets: action.payload}

        case 'GET_RECIPE_DETAILS':
        return {...state, details: action.payload }

        case 'CLEAN_RECIPE_DETAILS':
        return {...state, details: action.payload }    

        case'POST_RECIPE':
        return {...state}

        case 'FILTER_CREATED':
        const filterCreated = action.payload === 'Created' ? 
        state.allRecipes.filter(e => e.createdInDB) 
        : state.allRecipes.filter( e => !e.createdInDB)
        return {
            ...state,
            recipes: action.payload === 'All'? state.allRecipes 
            : filterCreated  
        }

        case 'FILTER_BY_DIET':
        const allRecipes = state.allRecipes
        const filterByDiet = action.payload === 'all diets'? allRecipes : allRecipes.filter(e => e.diets?.some(d => d.toLowerCase() === action.payload.toLowerCase()))
        return{
            ...state,
            recipes: filterByDiet
        }
        case 'FILTER_BY_NAME':
        const sortedArr = action.payload === 'asc'? state.recipes.sort(function (a,b){
            if( a.name > b.name) {
                return 1
            }
            if( b.name > a.name) {
                return -1
            }
            return 0
        }) :
        state.recipes.sort(function (a,b){
            if( a.name > b.name){
                return -1
            }
            if( b.name > a.name){
                return 1
            }
            return 0
        })
             return{
            ...state, sortedArr}
        
        case 'FILTER_BY_HEALTHSCORE':
            const sortedArrHealth = action.payload === 'desc'? state.recipes.sort(function (a,b){
                if( a.healthScore > b.healthScore) {
                    return 1
                }
                if( b.healthScore > a.healthScore) {
                    return -1
                }
                return 0
            }) :
            state.recipes.sort(function (a,b){
                if( a.healthScore > b.healthScore){
                    return -1
                }
                if( b.healthScore > a.healthScore){
                    return 1
                }
                return 0
            })
                 return{
                ...state, sortedArrHealth
            }

        case 'CLEAN_FILTERS':
            return {
                ...state,
                recipes: state.allRecipes,
                currentPage: 1
            }

        case 'CURRENT_PAGE':
            return {
            ...state,
            currentPage: action.payload
            }

        default: return state
    }
}

export default rootReducer;
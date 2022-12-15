const axios = require('axios')
const { Recipe, Diet } = require('../db')


const getApiRecipes =  async () => {
    const { API_URL, API_KEY1, API_KEY2, API_KEY3, API_KEY4 } = process.env;
  
    const recipesUrl = await axios.get(`${API_URL}complexSearch?apiKey=${API_KEY4}&addRecipeInformation=true&number=100&offset=100`, {headers:{'Accept-Encoding': 'identity'}});
    const recipesApi = await recipesUrl.data.results.map(e => {
        return{
            id: e.id,
            name: e.title,
            summary: e.summary,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions.map(e => e.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                    }
                }))
            }
        })
    return recipesApi
   } 

const getDbRecipes = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getTotalRecipes = async () =>{
    const totalApi = await getApiRecipes();
    const totalDb = await getDbRecipes();
    const totalApiDb = totalApi.concat(totalDb);
    return totalApiDb
}


module.exports =  getTotalRecipes 




const axios = require('axios')
// const fetch = (url) => import("node-fetch").then(({ default: fetch }) => fetch(url));
const { Recipe, Diet } = require('../db')


const getApiRecipes =  async () => {
    const {API_URL, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7, API_KEY8, API_KEY9, API_KEY10} = process.env;
  
    const recipesUrl = await axios.get(`${API_URL}complexSearch?apiKey=${API_KEY8}&addRecipeInformation=true&number=100&offset=100`, {headers:{'Accept-Encoding': 'identity'}});
    const recipesApi = await recipesUrl.data.results.map(e => {
        return{
            id: e.id,
            name: e.title,
            summary: e.summary,
            healthScore: e.healthScore,
            image: e.image,
            diets: e.diets,
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
//     }).then((data) => data.map( element => {
//         return {
//           ...element.dataValues,
//           diets: element.dataValues.diets.map((diet) => diet.name),
//         };
//       })
//     );
//   };


const getTotalRecipes = async () =>{
    const totalApi = await getApiRecipes();
    const totalDb = await getDbRecipes();
    const totalApiDb = totalApi.concat(totalDb);
    return totalApiDb
}


module.exports =  getTotalRecipes 




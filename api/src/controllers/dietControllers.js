const axios = require ('axios')
const { Recipe, Diet } = require('../db')


const getTotalDiets = async () =>{
    const { API_URL, API_KEY1 , API_KEY2, API_KEY3} = process.env;

    const totalDietDb = Diet.findAll()

    let dietUrl = await axios.get(`${API_URL}complexSearch?apiKey=${API_KEY3}&addRecipeInformation=true&number=100&offset=100`, {headers:{'Accept-Encoding': 'identity'}})
    let dietApi = await dietUrl.data.results.map(e => e.diets)
    let totalDietApi = dietApi.flat()
    // console.log(totalDietApi)


    totalDietApi.forEach(diet => {
        Diet.findOrCreate({
            where:{
            name: diet}
        }) 
    });

    return await Diet.findAll()
}

module.exports = { getTotalDiets }   


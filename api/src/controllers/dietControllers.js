const axios = require ('axios')
const { Recipe, Diet } = require('../db')
const { API_URL, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7, API_KEY8, API_KEY9, API_KEY10} = process.env;


const getTotalDiets = async (req, res, next) =>{
    try {
        let dietUrl = await axios.get(`${API_URL}complexSearch?apiKey=${API_KEY9}&addRecipeInformation=true&number=100&offset=100`, {headers:{'Accept-Encoding': 'identity'}})
        let dietApi = await dietUrl.data.results.map(e => e.diets)
        let finalDiets = []
        let totalDietApi = dietApi.flat().forEach(diet => {
            let totalDietApi = dietApi.flat().forEach((diet) => {
                if (!finalDiets.includes(diet)) {
                    finalDiets.push(diet);
                }
            })
            finalDiets.forEach(diets => {
            Diet.findOrCreate({
                where:{
                    name: diet}
                }) 
        });
    })
        console.log('diets cargadas en db')
    } catch (error) {
        next(error)
    }
};

const getDbDiets = async (req, res, next) => {
    try {
        const dietsDb = await Diet.findAll()
        res.send(dietsDb)
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getTotalDiets,
    getDbDiets
}   


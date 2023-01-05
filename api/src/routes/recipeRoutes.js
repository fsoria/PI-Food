const express = require('express');
const { Router } = require('express');
const getTotalRecipes = require('../controllers/recipeControllers');
const { Recipe, Diet } = require('../db');


const router = Router();


router.get('/', async (req, res, next) =>{
    const name = req.query.name
    const recipesTotal = await getTotalRecipes();
    try{
        if(!name){
            res.status(200).send(recipesTotal)
        }
        else{
            let recipeName = recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            recipeName.length?
            res.status(200).send(recipeName):
            res.status(404).send('The name of the recipe is not found')
        }
    }
    catch(error){
            next(error)
    }
})   


router.get('/:idReceta', async (req,res,next) =>{
    const idReceta  = req.params.idReceta
    const recipesTotal = await getTotalRecipes();
    const recipeId = recipesTotal.filter(e => e.id.toString() === idReceta.toString())
    try{
        if(recipeId.length){
            res.status(200).send(recipeId)
        }
        else{
            res.status(404).send('Recipe id not found')
        }
    }
    catch(error){
        next(error)
    }
})


router.post('/', async (req,res,next) =>{
    const {id,name,summary,healthScore,image,step,createdInDB, diet} = req.body

    const recipeCreated = await Recipe.create({
        id,
        name,
        summary,
        healthScore,
        image,
        step,
        createdInDB
    })

    const dietCreated = await Diet.findAll({
        where:{
        name : diet
        }
    })
    recipeCreated.addDiet(dietCreated)
    res.status(200).send('Recipe created succesfully')

})


module.exports = router
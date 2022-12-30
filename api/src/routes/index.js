const { Router } = require('express');
const recipeRoutes = require('./recipeRoutes')
const dietRoutes = require('./dietRoutes')


const router = Router();

router.use("/recipes", recipeRoutes)
router.use("/diets", dietRoutes)


module.exports = router;


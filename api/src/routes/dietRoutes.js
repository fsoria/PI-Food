const { Router } = require('express');
const { getTotalDiets } = require('../controllers/dietControllers');


const router = Router();

router.get('/', async (req,res) =>{
    const totalDiets = await getTotalDiets()
    res.status(200).send(totalDiets)
});


module.exports = router
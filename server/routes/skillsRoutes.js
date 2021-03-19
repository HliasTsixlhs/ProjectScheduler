const express = require('express');
const router = express.Router();

const skillController = require('../controllers/skillController');


//Get all skills
router.get('/', skillController.get_all_skills)

////Get Skills into .xlsx file and send them back
router.get('/excel', skillController.excel_all_skills)

//Post a new skill
router.post('/', skillController.post_one_skill)

//Post multiple skills
router.post('/many', skillController.post_many_skill)


//Get Skill by using Route param ID
router.get('/:id', skillController.get_one_skillByID)

//Delete a Skill based on Route param ID
router.delete('/:id', skillController.delete_one_skillByID)

//Update a Skill based on Route param ID
router.put('/:id/update', skillController.update_one_skillByID)




module.exports = router;
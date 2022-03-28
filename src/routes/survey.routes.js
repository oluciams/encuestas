const router = require('express').Router()

const {getHome, createSurvey, showSurveys, deleteSurvey } = require('../controllers/survey.controller')
//const {requireUser} = require ('../middlewares/auth.middleware')
const app = require('../index')


router.get('/', getHome)

router.post('/', createSurvey)

router.get('/surveys', showSurveys)

router.get

router.delete('/survey/delete/:id', deleteSurvey)



// router.get('/', requireUser, getHome)

// router.post('/', requireUser, createTask)

// router.get('/tasks',requireUser, showTasks)

// router.get('/tasks/edit/:id', requireUser, renderEditForm)

// router.put('/edit/:id', requireUser, updateTask)

// router.post('/status/:id', requireUser, updateStatus)

// router.delete('/tasks/delete/:id',requireUser, deleteTask)

module.exports = router 
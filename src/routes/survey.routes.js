const router = require('express').Router()

const {getHome, createSurvey, showSurveys, voteSurvey, showResults, deleteSurvey } = require('../controllers/survey.controller')
const {requireUser} = require ('../middleware/auth.middleware')
const app = require('../index')


router.get('/', getHome)

router.post('/', requireUser, createSurvey)

router.get('/surveys', showSurveys)

router.get('/vote', voteSurvey)

router.get('/results', showResults)

router.delete('/surveys/delete/:id', requireUser, deleteSurvey)


module.exports = router 
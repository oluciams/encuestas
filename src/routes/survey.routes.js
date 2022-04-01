const router = require('express').Router()

const {showCreateForm, createSurvey, showSurveys, voteSurvey, showResults, deleteSurvey } = require('../controllers/survey.controller')
const {requireUser} = require ('../middleware/auth.middleware')
const app = require('../index')

router.get('/', showSurveys)

router.get('/createSurvey', showCreateForm)

router.post('/createSurvey', requireUser, createSurvey)

router.get('/vote', voteSurvey)

router.get('/results', showResults)

router.delete('/surveys/delete/:id', deleteSurvey)


module.exports = router 
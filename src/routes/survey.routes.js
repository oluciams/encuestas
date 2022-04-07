const router = require('express').Router()

const {showCreateForm, createSurvey, showSurveys, voteSurvey, showResults, deleteSurvey, updateSurvey} = require('../controllers/survey.controller')
const {requireUser} = require ('../middleware/auth.middleware')
const app = require('../index')


router.get('/', showSurveys)

router.get('/createSurvey', showCreateForm)

router.post('/createSurvey', requireUser, createSurvey)

router.get('/results/:id', showResults)

router.get('/surveys/:id', voteSurvey)

router.put('/surveys/:id', updateSurvey)

router.delete('/surveys/delete/:id', deleteSurvey)

module.exports = router 
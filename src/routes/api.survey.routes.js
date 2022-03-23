const router = require('express').Router()

const {showSurveys, createSurvey, deleteSurvey} = require('../controllers/api.survey.controller')


router.get('/api/surveys', showSurveys)

router.post('/api/surveys', createSurvey)

router.delete('/api/surveys/:id', deleteSurvey)

module.exports = router
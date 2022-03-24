const router = require('express').Router()

const validator = require('../middleware/register.validator.middleware')
const userSchemaValidator = require('../validators/user.validator')

const {createUserForm, createUser, loginUserForm, loginUser, logoutUser} = require('../controllers/user.controller')

router.get('/register', createUserForm)
router.post('/register', validator(userSchemaValidator), createUser)

router.get('/login', loginUserForm)
router.post('/login', loginUser)

router.get('/logout', logoutUser)

module.exports = router
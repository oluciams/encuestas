const yup = require('yup')

const userSchemaValidator = yup.object ({    
    email: yup.string().email('email required').required(),
    password: yup.string().min(6).max(10).required()   
   
})

module.exports = userSchemaValidator
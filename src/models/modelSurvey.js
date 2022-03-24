const mongoose = require ('mongoose')

const Schema = mongoose.Schema;

const SurveySchema = new Schema ({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  option1: {
    type: String
  },
  option2: {
    type: String
  }
  
})

module.exports = mongoose.model('surveys', SurveySchema)
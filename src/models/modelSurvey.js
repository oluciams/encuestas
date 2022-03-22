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
  votes: Number,
  date: {
    type: Date, 
    default: Date.now()
  },
  answers: [
    {
      answer1: String,
      vote: { type: Number, default:0}
    },
    {
      answer2: String,
      vote: { type: Number, default:0}
    }
  ]
})

module.exports = mongoose.model('survey', SurveySchema)
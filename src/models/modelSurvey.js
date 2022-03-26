const mongoose = require ('mongoose');
const { date } = require('yup');

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
  date: {
    type: Date,
    default: Date.now()
  },
  options: [{
    option: {
      type: String,
      default: ""
    },
    vote: {
      type: Number,
      default: 0
    }
  }]  
})

module.exports = mongoose.model('surveys', SurveySchema)
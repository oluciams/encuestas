const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email:{
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'is required']
  },
  password: {
    type: String,
    required: [true, 'is required']
  }
});

module.exports = mongoose.model('User', UserSchema)
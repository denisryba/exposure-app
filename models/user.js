const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  passwordHash: String,
});

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
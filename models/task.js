const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  executionStart: Date,
  executionEnd: Date,
  completed: Boolean,
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan'
  },
  date: Date
});

taskSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Task', taskSchema);
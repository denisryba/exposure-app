const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  employeePosition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  hr: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  stage: String,
  adaptationStart: Date,
  adaptationEnd: Date,
  completed: Boolean,
  rate: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ],
  date: Date,
});

planSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Plan', planSchema);
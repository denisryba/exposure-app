const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

const planSchema = new mongoose.Schema({
  employeePosition: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Position'
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  hr: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  stage: {
    type: String,
    required: true
  },
  adaptationStart: {
    type: Date,
    required: true
  },
  adaptationEnd: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  rate: {
    type: String,
    required: true
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ],
  date: {
    type: Date,
    required: true
  },
});

planSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Plan', planSchema);
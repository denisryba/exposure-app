const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  executionStart: {
    type: Date,
    required: true
  },
  executionEnd: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Plan'
  },
  date: {
    type: Date,
    required: true
  }
});

taskSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Task', taskSchema);
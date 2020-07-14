const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  employeePosition: mongoose.Schema.Types.ObjectId,
  employeeId: mongoose.Schema.Types.ObjectId,
  supervisorId: mongoose.Schema.Types.ObjectId,
  hrId: mongoose.Schema.Types.ObjectId,
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
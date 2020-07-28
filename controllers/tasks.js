const tasksRouter = require('express').Router();
const Task = require('../models/task.js');
const Plan = require('../models/plan.js');
const logger = require('../utils/logger.js');

tasksRouter.get('/', async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

tasksRouter.get('/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).end();
  }
});

tasksRouter.post('/', async (req, res) => {
  const body = req.body;

  const plan =  await Plan.findById(body.plan);

  if (plan) {
    const task = new Task({
      name: body.name,
      description: body.description,
      executionStart: new Date(body.executionStart),
      executionEnd: new Date(body.executionEnd),
      completed: body.completed,
      plan: plan._id,
      date: new Date()
    });
  
    const savedTask = await task.save();
    plan.tasks = plan.tasks.concat(savedTask._id);
    await plan.save();
    return res.json(savedTask);
  }

  res.status(400).json('plan does not exist for provided id')
});

tasksRouter.delete('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  const plan = await Plan.findById(task.plan);

  plan.tasks = plan.tasks.filter(taskId => taskId.toString() !== task._id.toString());
  
  await Task.findByIdAndDelete(req.params.id);
  await plan.save();
  res.status(204).end();
});

tasksRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const task = {
    name: body.name,
    description: body.description,
    executionStart: new Date(body.executionStart),
    executionEnd: new Date(body.executionEnd),
    completed: body.completed,
  };

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, task, { new: true });
  res.json(updatedTask);
});

module.exports = tasksRouter;
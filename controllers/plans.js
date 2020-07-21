const plansRouter = require('express').Router();
const Plan = require('../models/plan.js');

plansRouter.get('/', async (req, res) => {
  const plans = await Plan
    .find({})
    .populate('employee')
    .populate('supervisor')
    .populate('hr')
    .populate('employeePosition');
  res.json(plans);
});

plansRouter.get('/:id', async (req, res, next) => {
  const plan = await Plan
    .findById(req.params.id)
    .populate('employee')
    .populate('supervisor')
    .populate('hr');

  if (plan) {
    res.json(plan);
  } else {
    res.status(404).end();
  }
});

plansRouter.get('/:id/tasks', async (req, res, next) => {
  const plan = await Plan
    .findById(req.params.id)
    .populate('tasks');

  const tasks = plan.tasks;

  if (tasks) {
    res.json(tasks);
  } else {
    res.status(404).end();
  }
});

plansRouter.post('/', async (req, res) => {
  validateToken(req.token);

  const { body, token } = req;

  const plan = new Plan({
    employeePosition: body.employeePosition,
    employee: body.employee,
    supervisor: body.supervisor,
    hr: body.hr,
    stage: body.stage || 'Заполнение сотрудником',
    adaptationStart: new Date(body.adaptationStart),
    adaptationEnd: new Date(body.adaptationEnd),
    completed: body.completed || false,
    rate: body.rate || 'отсутствует',
    tasks: body.tasks,
    date: new Date(),
  });

  const savedPlan = await plan.save();
  res.json(savedPlan);
});

plansRouter.delete('/:id', async (req, res) => {
  validateToken(req.token);

  await Plan.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

plansRouter.put('/:id', async (req, res) => {
  validateToken(req.token);

  const body = req.body;

  const plan = {
    employeePosition: body.employeePosition,
    employee: body.employee,
    supervisor: body.supervisor,
    hr: body.hr,
    stage: body.stage,
    adaptationStart: new Date(body.adaptationStart),
    adaptationEnd: new Date(body.adaptationEnd),
    completed: body.completed,
    rate: body.rate,
  };

  const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, plan, { new: true });
  res.json(updatedPlan);
});

module.exports = plansRouter;
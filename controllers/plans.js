const plansRouter = require('express').Router();
const Plan = require('../models/plan.js');

plansRouter.get('/', async (req, res) => {

  const plans = await Plan.find({});
  res.json(plans);

});

plansRouter.get('/:id', async (req, res, next) => {
  const plan = await Plan.findById(req.params.id);

  if (plan) {
    res.json(plan);
  } else {
    res.status(404).end();
  }
});

plansRouter.post('/', async (req, res) => {
  const body = req.body;

  const plan = new Plan({
    employeePosition: body.employeePosition,
    employeeId: body.employeeId,
    supervisorId: body.supervisorId,
    hrId: body.hrId,
    stage: body.stage,
    adaptationStart: new Date(body.adaptationStart),
    adaptationEnd: new Date(),
    completed: body.completed,
    rate: body.rate,
    tasks: body.tasks,
    date: new Date(),
  });

  const savedPlan = await plan.save();
  res.json(savedPlan);

});

plansRouter.delete('/:id', async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = plansRouter;
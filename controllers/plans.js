const plansRouter = require('express').Router();
const Plan = require('../models/plan.js');
const role = require('../utils/role.js');

const permissionError = {
  error: 'you do not have permission to perform this request'
};

plansRouter.get('/', async (req, res) => {
  const { user } = req;
  const page = +req.query.page;
  const limit = +req.query.limit;
  let filter = {};

  if (user.role === role.employee || user.role === role.supervisor) {
    filter = {
      [user.role]: user.id
    }
  }

  const startIndex = (page - 1) * limit;

  const results = {};

  const pageCount = await Plan.countDocuments(filter).exec()/limit;
  if (pageCount)
    results.pageCount = Math.ceil(pageCount)
  else results.pageCount = 1;

  results.plans = await Plan.find(filter).limit(limit).skip(startIndex)
    .populate('employee')
    .populate('supervisor')
    .populate('hr')
    .populate('employeePosition')
    .exec();
  res.json(results);
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
  const { body, user } = req;

  if (user.role !== role.hr) {
    return res.status(401).json(permissionError);
  }

  const plan = new Plan({
    employeePosition: body.employeePosition,
    employee: body.employee,
    supervisor: body.supervisor,
    hr: user.id,
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
  const { user } = req;
  if (user.role === role.employee) {
    return res.status(401).json(permissionError);
  }
  await Plan.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

plansRouter.put('/:id', async (req, res) => {
  const { body, user } = req;

  if (user.role === role.employee) {
    return res.status(401).json(permissionError);
  }

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
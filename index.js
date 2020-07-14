require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGODB_URL;

const PORT = process.env.PORT || 3001;

const Plan = require('./models/plan');

app.use(cors())
app.use(express.json());

console.log('connecting to', MONGO_URL);

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to Mongo');
  })
  .catch(error => {
    console.log('error occured while connecting', error.message);
  });

app.get('/api/plans', (req, res) => {
  Plan.find({}).then(plans => {
    res.json(plans);
  });
});

app.post('/api/plans', (req, res) => {
  const body = req.body;

  console.log(`incoming POST request with body`, body);

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

  plan.save()
    .then(savedPlan => {
    res.json(savedPlan);
  })
    .catch(error => {
      res.status(400).json({ error: 'some error happened while posting data to db' })
    });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
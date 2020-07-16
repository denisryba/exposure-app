const positionsRouter = require('express').Router();
const Position = require('../models/position.js');

positionsRouter.get('/', async (req, res) => {
  const positions = await Position.find({});
  res.json(positions);
});

positionsRouter.get('/:id', async (req, res, next) => {
  const position = await Position.findById(req.params.id);

  if (position) {
    res.json(position);
  } else {
    res.status(404).end();
  }
});

positionsRouter.post('/', async (req, res) => {
  const body = req.body;

  const position = new Position({
    name: body.name,
    description: body.description
  });

  const savedPosition = await position.save();
  res.json(savedPosition);
});

positionsRouter.delete('/:id', async (req, res) => {
  await Position.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = positionsRouter;
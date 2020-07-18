const usersRouter = require('express').Router();
const User = require('../models/user.js');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.get('/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = new User({
    username: body.username,
    name: {
      first: body.name.first,
      last: body.name.last,
      middle: body.name.middle
    },
    email: body.email,
    role: body.role || 'employee'
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

usersRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const user = {
    username: body.username,
    name: {
      first: body.name.first,
      last: body.name.last,
      middle: body.name.middle
    },
    email: body.email,
    role: body.role
  };

  const updatedUser = await User.findByIdAndUpdate(req.params.id, user, { new: true });
  res.json(updatedUser);
});

module.exports = usersRouter;
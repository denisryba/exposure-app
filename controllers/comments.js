const commentsRouter = require('express').Router();
const Comment = require('../models/comment.js');
const Plan = require('../models/plan.js');

commentsRouter.get('/', async (req, res) => {
  const comments = await Comment
    .find({})
    .populate({
      path: 'user',
      select: '-email -username'  
    });
  res.json(comments);
});

commentsRouter.get('/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    res.json(comment);
  } else {
    res.status(404).end();
  }
});

commentsRouter.post('/', async (req, res) => {
  const { body, user } = req;
  const plan =  await Plan.findById(body.plan);

  if (plan) {
    const comment = new Comment({
      content: body.content,
      user: user.id,
      plan: plan._id,
      date: new Date()
    });
  
    const savedComment = await comment.save();
    plan.comments = plan.comments.concat(savedComment._id);
    await plan.save();
    const newComment = await Comment.findOne(savedComment)
                              .populate({
                                path: 'user',
                                select: '-email -username'
                              });
    return res.json(newComment);
  }

  res.status(400).json('plan does not exist for provided id')
});

commentsRouter.delete('/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  const plan = await Plan.findById(task.plan);

  plan.comments = plan.comments.filter(commentId => commentId.toString() !== comment._id.toString());
  
  await Comment.findByIdAndDelete(req.params.id);
  await plan.save();
  res.status(204).end();
});

module.exports = commentsRouter;
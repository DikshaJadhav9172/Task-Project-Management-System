const commentService = require('../services/commentService');

async function createComment(req, res, next) {
  try {
    const comment = await commentService.createComment({
      task_id: req.body.task_id,
      user_id: req.user.id,
      comment_text: req.body.comment_text
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

async function getCommentsByTask(req, res, next) {
  try {
    const comments = await commentService.getCommentsByTask(req.params.taskId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createComment,
  getCommentsByTask
};


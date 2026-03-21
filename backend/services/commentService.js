const commentRepository = require('../repositories/commentRepository');

async function createComment({ task_id, user_id, comment_text }) {
  return commentRepository.createComment({ task_id, user_id, comment_text });
}

async function getCommentsByTask(taskId) {
  return commentRepository.getCommentsByTask(taskId);
}

module.exports = {
  createComment,
  getCommentsByTask
};


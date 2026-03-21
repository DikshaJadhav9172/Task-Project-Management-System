class Comment {
  constructor({ id, task_id, user_id, comment_text, created_at, user_name, user_email }) {
    this.id = id;
    this.task_id = task_id;
    this.user_id = user_id;
    this.comment_text = comment_text;
    this.created_at = created_at;
    this.user_name = user_name;
    this.user_email = user_email;
  }
}

module.exports = Comment;


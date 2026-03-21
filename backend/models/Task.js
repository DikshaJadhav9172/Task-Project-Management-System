class Task {
  constructor({
    id,
    title,
    description,
    priority,
    status,
    due_date,
    assigned_user,
    assigned_user_name,
    project_id,
    project_name
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.due_date = due_date;
    this.assigned_user = assigned_user;
    this.assigned_user_name = assigned_user_name;
    this.project_id = project_id;
    this.project_name = project_name;
  }
}

module.exports = Task;


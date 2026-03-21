class Project {
  constructor({ id, name, description, start_date, end_date, status, created_by, created_by_name }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.status = status;
    this.created_by = created_by;
    this.created_by_name = created_by_name;
  }
}

module.exports = Project;


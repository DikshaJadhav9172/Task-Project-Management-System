import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api, { showErrorToast } from "../../services/api";
import "./Tasks.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status?.toLowerCase() === filter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="tasks-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>My Tasks</h1>

        <div className="filter-buttons">
          {["all", "pending", "in progress", "completed"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? `All (${tasks.length})` : f}
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">No tasks found</div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <Link key={task.id} to={`/task/${task.id}`} className="task-card">
              {/* 🔥 Header with arrow */}
              <div className="task-header">
                <h3>{task.title}</h3>
                <ArrowRight size={16} className="card-arrow" />
              </div>

              <p className="task-description">{task.description}</p>

              {/* Status badge */}
              <div className="task-status-row">
                <span
                  className={`status-pill status-${formatStatus(task.status)}`}
                >
                  {task.status}
                </span>
              </div>

              <div className="task-footer">
                <span
                  className={`priority priority-${task.priority?.toLowerCase()}`}
                >
                  {task.priority} Priority
                </span>

                <span className="due-date">
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const formatStatus = (status) => {
  return status?.toLowerCase().replace(" ", "-");
};

export default TaskList;

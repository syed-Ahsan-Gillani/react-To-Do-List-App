import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // LocalStorage se saved tasks uthane ke liye fallback function
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("react-todo-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState("");

  // Jab bhi tasks array change hoga, yeh auto-save kar dega
  useEffect(() => {
    localStorage.setItem("react-todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Naya Task Add karne ke liye
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Khali text add nahi hoga

    const newTask = {
      id: Date.now(), // Unique ID ke liye timestamp
      text: inputValue.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue(""); // Input clear karne ke liye
  };

  // Task ko Completed/Pending toggle karne ke liye
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Task Delete karne ke liye
  const deleteTask = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this task?");

  if (confirmDelete) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
};

  // Status calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">🎯 My Day</h1>
        <p className="subtitle">Stay focused, be productive</p>

        {/* Form Input */}
        <form onSubmit={handleAddTask} className="todo-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="todo-input"
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>

        {/* Task Counter Stats */}
        {totalTasks > 0 && (
          <div className="stats-container">
            <span>Total: {totalTasks}</span>
            <span>Completed: {completedTasks} of {totalTasks}</span>
          </div>
        )}

        {/* Task List */}
        <ul className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">👏 No tasks for today! Relax or add some.</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
              >
                <div className="task-content" onClick={() => toggleComplete(task.id)}>
                  <div className="checkbox">
                    {task.completed && <span className="check-mark">✓</span>}
                  </div>
                  <span className="task-text">{task.text}</span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                  title="Delete Task"
                >
                  🗑️
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
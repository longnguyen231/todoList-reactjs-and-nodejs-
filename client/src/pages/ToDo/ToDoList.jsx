import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import styles from "./TodoList.module.css";
import {
  Button,
  Divider,
  Input,
  message,
  Modal,
  Tag,
  Tooltip,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import ToDoServices from "../../services/toDoServices";
import getUserDetail from "../../utils/GetUser";
import  getErrorMessage  from "../../utils/GetError";

const { Option } = Select;

function TodoList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await ToDoServices.getToDos();
      setTasks(response.todos || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const handleSubmitTask = async () => {
    if (!title.trim() || !description.trim()) {
      message.warning("Please provide both title and description!");
      return;
    }

    try {
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: getUserDetail()?.id,
      };

      setLoading(true);
      await ToDoServices.createToDo(data);
      message.success("Task added successfully!");
      setTitle("");
      setDescription("");
      setIsAdding(false);
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing task
  const handleEditTask = async () => {
    if (!title.trim() || !description.trim()) {
      message.warning("Please provide both title and description!");
      return;
    }

    try {
      const data = {
        title,
        description,
        isCompleted: editingTask.isCompleted,
      };

      setLoading(true);
      await ToDoServices.updateToDo(editingTask._id, data);
      message.success("Task updated successfully!");
      setTitle("");
      setDescription("");
      setIsEditing(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      setLoading(true);
      await ToDoServices.deleteToDo(id);
      message.success("Task deleted successfully!");
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Mark task as completed
  const handleCompleteTask = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const updatedTask = { ...task, isCompleted: true };

      setLoading(true);
      await ToDoServices.updateToDo(id, updatedTask);
      message.success("Task marked as completed!");
      fetchTasks();
    } catch (err) {
      console.error("Error marking task as completed:", err);
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const getFormattedDate = (value) => {
    const date = new Date(value);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.isCompleted) ||
      (statusFilter === "Incomplete" && !task.isCompleted);
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Navbar active="myTask" />
      <section className={styles.toDoWrappers}>
        <div className={styles.toDoHeaders}>
          <h2>Your Tasks</h2>
          <Input
            style={{ flex: 1, marginRight: "20px" }}
            placeholder="Search Your Tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.actionButtons}>
            <Button
              onClick={() => setIsAdding(true)}
              type="primary"
              size="large"
            >
              Add Task
            </Button>
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              style={{ width: 150 }}
            >
              <Option value="All">All</Option>
              <Option value="Incomplete">Incomplete</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </div>
        </div>
        <Divider />
        <div className={styles.toDoList}>
          {filteredTasks.map((task) => (
            <div key={task._id} className={styles.toDoCard}>
              <div className={styles.toDoCardHeader}>
                <h3>{task.title}</h3>
                <Tag color={task.isCompleted ? "cyan" : "red"}>
                  {task.isCompleted ? "Completed" : "Incomplete"}
                </Tag>
              </div>
              <p>{task.description}</p>
              <div className={styles.toDoCardFooter}>
                <Tag>{getFormattedDate(task.createdAt)}</Tag>
                <div className={styles.toDoFooterAction}>
                  <Tooltip title="Edit Task">
                    <EditOutlined
                      className={styles.actionIcon}
                      onClick={() => {
                        setIsEditing(true);
                        setEditingTask(task);
                        setTitle(task.title);
                        setDescription(task.description);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Delete Task">
                    <DeleteOutlined
                      className={styles.actionIcon}
                      style={{ color: "red" }}
                      onClick={() => handleDeleteTask(task._id)}
                    />
                  </Tooltip>
                  {!task.isCompleted && (
                    <Tooltip title="Mark as Completed">
                      <CheckCircleFilled
                        className={styles.actionIcon}
                        style={{ color: "green" }}
                        onClick={() => handleCompleteTask(task._id)}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Modal */}
        <Modal
          title="Add New Task"
          open={isAdding}
          confirmLoading={loading}
          onOk={handleSubmitTask}
          onCancel={() => setIsAdding(false)}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>

        {/* Edit Task Modal */}
        <Modal
          title="Edit Task"
          open={isEditing}
          confirmLoading={loading}
          onOk={handleEditTask}
          onCancel={() => {
            setIsEditing(false);
            setEditingTask(null);
            setTitle("");
            setDescription("");
          }}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>
      </section>
    </div>
  );
}

export default TodoList;

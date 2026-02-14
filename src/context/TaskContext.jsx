import { createContext, useContext, useEffect, useState } from "react";
import {
  DeleteTask,
  editTask,
  ListPriority,
  ListStatus,
  ListTask,
} from "../services/TaskServices";

const TaskContext = createContext();
export default TaskContext;

export const TaskProvider = ({ children }) => {
  const [Tasks, setTask] = useState([]);
  const [Status, setStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [Priority, setPriority] = useState([]);
  useEffect(() => {
    ListTask().then((res) => setTask(res.data));
    ListStatus().then((res) => setStatus(res.data));
    ListPriority().then((res) => setPriority(res.data));
    
  }, []);
  const openAddModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };
  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };
  const refreshTasks = async () => {
    const taskRes = await ListTask();
    setTask(taskRes.data);
  };
  const DeleteTaskItem = async (id) => {
    await DeleteTask(id);
    refreshTasks();
  };
  const handleNextStatus = async (task) => {
    let newStatus = String(Number(task.Status) + 1);
    if (task.Status === "3") return; // Status 3 آخره، کاری نکن
    const updatedTask = { ...task, Status: newStatus };

    // اگر داری API برای ویرایش داری:
    await editTask(updatedTask, task.id);
    await refreshTasks(); // بروز رسانی لیست
  };
  return (
    <TaskContext.Provider
      value={{
        Tasks,
        Status,
        Priority,
        isModalOpen,
        selectedTask,
        setTask,
        setStatus,
        openAddModal,
        openEditModal,
        closeModal,
        refreshTasks,
        handleNextStatus,
        DeleteTaskItem
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export const useTask = () => {
  return useContext(TaskContext);
};

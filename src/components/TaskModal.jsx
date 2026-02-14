import Modal from "react-modal";
import { useEffect, useState } from "react";
import { createTask, editTask, ListPriority, ListStatus } from "../services/TaskServices";
import { useTask } from "../context/TaskContext";

Modal.setAppElement("#root");

const TaskModal = () => {
  const {
    isModalOpen,
    closeModal,
    selectedTask,
    refreshTasks
  } = useTask();

  const [task, setTask] = useState({ title: "", body: "", Status: "", Priority: "", date: "" });
  const [Status, setStatus] = useState([]);
  const [Priority, setPriority] = useState([]);

  // وقتی selectedTask تغییر کرد، فرم پر یا خالی شود
  useEffect(() => {
    if (selectedTask) setTask(selectedTask);
    else setTask({ title: "", body: "", Status: "", Priority: "", date: "" });
  }, [selectedTask]);

  // گرفتن وضعیت‌ها و اولویت‌ها
  useEffect(() => {
    const fetchData = async () => {
      const { data: statusData } = await ListStatus();
      setStatus(statusData);
      const { data: priorityData } = await ListPriority();
      setPriority(priorityData);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTask) await editTask(task,task.id);
      else await createTask(task);

      await refreshTasks();
      closeModal();
    } catch (error) {
      console.log("Error saving task:", error);
    }
  };
  return (
<>

    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="modal-content-custom"
      overlayClassName="modal-overlay-custom"
    >
      <div className="modal-header">
        <h5 className="modal-title">{selectedTask ? "ویرایش تسک" : "افزودن تسک"}</h5>
        <button type="button" className="btn-close" onClick={closeModal}></button>
      </div>

      <form onSubmit={handleSubmit} className="modal-body">
        <div className="mb-3">
          <label className="form-label">عنوان</label>
          <input
            type="text"
            className="form-control"
            name="title"
            required
            value={task.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">توضیحات</label>
          <textarea
            className="form-control"
            name="body"
            rows="3"
            value={task.body}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">وضعیت</label>
          <select
            className="form-select"
            name="Status"
            value={task.Status}
            onChange={handleChange}
          >
            <option value="">نوع وضعیت</option>
            {Status.map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">اولویت</label>
          <div className="d-flex gap-2">
            {Priority.map((item) => (
              <div className="form-check" key={item.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="Priority"
                  value={item.id}
                  checked={task.Priority === item.id}
                  onChange={handleChange}
                  id={`priority-${item.id}`}
                />
                <label className="form-check-label" htmlFor={`priority-${item.id}`}>
                  {item.title}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <input
            type="date"
            name="date"
            value={task.date}
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            بستن
          </button>
          <button type="submit" className="btn btn-primary">
            {selectedTask ? "ویرایش" : "افزودن"}
          </button>
        </div>
      </form>
    </Modal>
</>
  );
};

export default TaskModal;

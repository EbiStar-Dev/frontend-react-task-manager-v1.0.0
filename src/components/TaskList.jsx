import { useTask } from "../context/TaskContext";


const TaskList = () => {
    const {Tasks} = useTask();
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
        
      {Tasks.map(item => (
        <div className="col" key={item.id}>
          <div className="card text-end">
            <div className="card-header d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm ms-2"
                >
                  <i className="bi bi-x" title="Close"></i>
                </button>
                <strong>{item.title}</strong>
              </div>
              <small>11 mins ago</small>
            </div>
            <div className="card-body">
              <p>Hello, world! This is a normal message.</p>
              <div className="d-flex mt-2 justify-content-between">
                <div className="action">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm ms-2"
                  >
                    <i className="bi bi-pen"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm ms-2">
                    <i className="bi bi-arrow-left"></i>
                  </button>
                </div>
                <span className="btn btn-light">انجام نشده</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TaskList;

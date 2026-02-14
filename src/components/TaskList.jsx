import { useTask } from "../context/TaskContext";

const TaskList = () => {
  const {
    Tasks,
    Status,
    handleNextStatus,
    openEditModal,
    DeleteTaskItem,
    Priority,
  } = useTask();

  const getStatusClass = (item) => {
    switch (item) {
      case "1":
        return "light";
      case "2":
        return "warning";
      case "3":
        return "success";
    }
  };
  // تابع تغییر Status
  console.log(Priority);
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {Tasks.length > 0 ? (
        Tasks.map((item) => (
          <div className="col" key={item.id}>
            <div className="card text-end">
              <div className="card-header d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => DeleteTaskItem(item.id)}
                  >
                    <i className="bi bi-x" title="Close"></i>
                  </button>
                  <strong>{item.title}</strong>
                </div>
                <span className="badge bg-light text-dark px-2 py-1 mt-1"> اولویت : 
                      <span>
                        {Priority.find((f) => f.id == item.Priority)?.title ||
                        "بدون اولویت"}
                      </span>
                    </span>
              </div>
              <div className="card-body">
                <p>{item.body}</p>
                <div className="d-flex mt-2 justify-content-between">
                  <div className="action d-flex flex-column align-items-start gap-2">
                    {/* ردیف دکمه‌ها */}
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => openEditModal(item)}
                        title="ویرایش"
                      >
                        <i className="bi bi-pen"></i>
                      </button>

                      {item.Status !== "3" && (
                        <button
                          type="button"
                          className="btn btn-dark btn-sm"
                          onClick={() => handleNextStatus(item)}
                          title="بعدی"
                        >
                          تغییر وضعیت
                          <i className=" me-1 bi bi-arrow-left"></i>
                        </button>
                      )}
                      
                    </div>
                    
                  </div>

                  <span className={`btn btn-sm btn-${getStatusClass(item.Status)}`}>
                    {Status.length > 0
                      ? Status.find((f) => f.id == item.Status)?.title
                      : "در حال بارگذاری..."}
                      
                  </span>
                  
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-danger" role="alert">
          داده ای یافت نشد!
        </div>
      )}
    </div>
  );
};
export default TaskList;

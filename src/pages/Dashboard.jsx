
import TaskList from "../components/TaskList"
import TaskModal from "../components/TaskModal"
import { useTask } from "../context/TaskContext";

export const Dashboard =()=>{
const { openAddModal } = useTask();
    return(
        <>
        <header className="shadow-lg">
            <div className="row align-items-center">
                <div className="col-2">
                    <h1 className="logo">
                        Task Manager
                    </h1>
                </div>
                <div className="col-6">
                    <input type="text" placeholder="جستجو تسک" className="serach-Box" />
                </div>
                <div className="col-4 text-start">
                      <button className="btn btn-dark" onClick={openAddModal}>
    افزودن تسک
  </button>
                    <TaskModal/>
                </div>
            </div>
        </header>
        <section>
        <TaskList />
        </section>
        </>
    )
}
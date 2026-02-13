import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
    <TaskProvider>
      <div className="container my-3">
      <TaskList/>
    </div>
    </TaskProvider>
  );
};

export default App;

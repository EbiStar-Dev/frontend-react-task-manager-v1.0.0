
import { TaskProvider } from "./context/TaskContext";
import { Dashboard } from "./pages/Dashboard";

const App = () => {

  return (
    <TaskProvider>
      <div className="container">
      <Dashboard/>
    </div>
    </TaskProvider>
  );
};

export default App;

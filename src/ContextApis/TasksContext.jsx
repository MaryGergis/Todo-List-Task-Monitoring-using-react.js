import axios from "axios";
import { createContext, useEffect, useMemo, useState , useCallback} from "react";

const TasksContext = createContext();

export const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const { children } = props;
  
  const getTasks = useCallback(() => {
    axios
      .get("http://localhost:2000/todos")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  }, []);

  useEffect(() => {
    getTasks(); 
  }, [getTasks]); 

  const addTask = useCallback((task) => {
    return axios
      .post("http://localhost:2000/todos", { ...task, status: "todo" })
      .then(() => {
        getTasks();
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }, [getTasks]);

  let getTaskById = (taskId) => {
    return axios
      .get(`http://localhost:2000/todos/${taskId}`)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const deleteTask = useCallback((taskId) => {
    axios
      .delete(`http://localhost:2000/todos/${taskId}`)
      .then(() => getTasks())
      .catch((err) => console.log(err));
  }, [getTasks]);

  const editTask = useCallback((taskId, task) => {
    axios
      .patch(`http://localhost:2000/todos/${taskId}`, task)
      .then(() => getTasks())
      .catch((err) => console.log(err));
  }, [getTasks]);

  const moveTaskToInProgress = useCallback((taskId) => {
    axios
      .patch(`http://localhost:2000/todos/${taskId}`, { status: "inProgress" })
      .then(() => {
        getTasks();
      })
      .catch((err) => {
        console.error("Error moving task to inProgress:", err);
      });
  }, [getTasks]);

  const moveTaskToCompleted = useCallback((taskId) => {
    axios
      .patch(`http://localhost:2000/todos/${taskId}`, { status: "completed" })
      .then(() => {
        getTasks();
      })
      .catch((err) => {
        console.error("Error moving task to completed:", err);
      });
  }, [getTasks]);

  const contextValue = useMemo(() => ({
    tasks,
    addTask,
    moveTaskToInProgress,
    moveTaskToCompleted,
    editTask,
    deleteTask,
    getTaskById,
  }), [tasks, addTask, deleteTask, editTask, moveTaskToCompleted, moveTaskToInProgress]);
  

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;

import axios from "axios";
import { createContext, useEffect, useMemo, useState , useCallback, useContext} from "react";
import { UsersContext } from "./UsersContext";
import { toast } from "react-toastify";

const TasksContext = createContext();

export const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const { children } = props;
  const { CurrentUser } = useContext(UsersContext);

  const getTasks = useCallback((userId) => {
    // Fetch tasks based on the provided user ID if CurrentUser exists
    if (CurrentUser) {
      axios
        .get(`http://localhost:2000/tasks?user=${userId}`)
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => {
          console.error("Error fetching tasks:", err);
        });
    }
  }, [CurrentUser]);

  useEffect(() => {
    if (CurrentUser) {
      getTasks(CurrentUser.id);
    }
  }, [getTasks, CurrentUser]);

  const addTask = useCallback(
    (task) => {
      if (CurrentUser) {
        return axios
          .post("http://localhost:2000/tasks", { ...task, status: "todo", user: CurrentUser.id })
          .then(() => {
            // Fetch the updated task list after adding a new task
            return axios.get(`http://localhost:2000/tasks?user=${CurrentUser.id}`);
          })
          .then((res) => {
            // Update the tasks state with the new task list fetched from the server
            setTasks(res.data);
            toast.success("Added Successfully");
          })
          .catch((err) => {
            console.log(err);
            return Promise.reject(err);
          });
      }
    },
    [CurrentUser]
  );

  let getTaskById = (taskId) => {
    return axios
      .get(`http://localhost:2000/tasks/${taskId}`)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const deleteTask = useCallback((taskId) => {
    axios
      .delete(`http://localhost:2000/tasks/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        toast.success("Deleted Successfully");
      })
      .catch((err) => console.log(err));
  }, []);

  const editTask = useCallback((taskId, updatedTask) => {
    axios
      .patch(`http://localhost:2000/tasks/${taskId}`, updatedTask)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task))
        );
        toast.success("Updated Successfully");
      })
      .catch((err) => console.log(err));
  }, []);

  const moveTaskToInProgress = useCallback((taskId) => {
    axios
      .patch(`http://localhost:2000/tasks/${taskId}`, { status: "inProgress" })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? { ...task, status: "inProgress" } : task))
        );
        toast.success("Added to In Progress");
      })
      .catch((err) => {
        console.error("Error moving task to inProgress:", err);
      });
  }, []);

  const moveTaskToCompleted = useCallback((taskId) => {
    axios
      .patch(`http://localhost:2000/tasks/${taskId}`, { status: "completed" })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task))
        );
        toast.success("Completed");
      })
      .catch((err) => {
        console.error("Error moving task to completed:", err);
      });
  }, []);

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

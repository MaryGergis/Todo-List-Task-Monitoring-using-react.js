import React, { useEffect, useState , useCallback} from "react";
import axios from "axios";
import { UsersContext } from "./UsersContext";

function UsersProvider(props) {
  const [CurrentUser, setCurrentUser] = useState(null); 
  const [UsersData, setUsersData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:2000/User").then((res) => {
      setUsersData(res.data);
      const user = sessionStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
      }
    }).catch((err) => {
      console.error("Error fetching users:", err);
    });
  }, []);

  function handleUser(user){
    setCurrentUser(user)
    console.log(CurrentUser);
  }

  const currentUserReset=()=>{
    setCurrentUser(null);
    sessionStorage.clear();
    localStorage.clear();
  }

  const DeleteUser = (id) => {
    if (CurrentUser?.id === id) {
      currentUserReset();
    }
    // Fetch user tasks
    axios.get(`http://localhost:2000/tasks?user=${id}`)
      .then((res) => {
        const userTasks = res.data;
        const deletePromises = userTasks.map((task) => {
          return axios.delete(`http://localhost:2000/tasks/${task.id}`);
        });
      })
      .then(() => {
        // All tasks deleted, now delete the user
        axios.delete(`http://localhost:2000/User/${id}`)
          .then(() => {
            // User deleted successfully
            getUsers();
          })
          .catch((deleteUserError) => {
            console.error("Error deleting user:", deleteUserError);
          });
      })
      .catch((error) => {
        console.error("Error deleting user tasks:", error);
      });
  };
  
  const getUsers = useCallback(() => {
    axios
      .get("http://localhost:2000/User")
      .then((res) => {
        setUsersData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  useEffect(() => {
    getUsers(); 
  }, [getUsers]); 

  const editUser = useCallback((userId, user) => {
    axios
      .patch(`http://localhost:2000/User/${userId}`, user)
      .then(() => getUsers())
      .catch((err) => console.log(err));
  }, [getUsers]);

  let values = {
    CurrentUser, setCurrentUser,
    handleUser,
    UsersData,
    DeleteUser,
    currentUserReset, 
    editUser, 
  };

  return (
    <UsersContext.Provider value={values}>
      {props.children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;

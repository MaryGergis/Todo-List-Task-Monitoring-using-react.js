import React, { useEffect, useState , useCallback} from "react";
import axios from "axios";
import { UsersContext } from "./UsersContext";

function UsersProvider(props) {
  const [CurrentUser, setCurrentUser] = useState(null); 
  const [UsersData, setUsersData] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
    }
    axios.get("http://localhost:2000/User").then((res) => {
      setUsersData(res.data);
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

  const DeleteUser=(id)=>{
    if(CurrentUser?.id===id){
        currentUserReset();
    }
    axios.delete(`http://localhost:2000/User/${id}`).then(
        ()=>{
            axios.get("http://localhost:2000/User").then((res)=>{
                setUsersData(res.data);
            })
        }
    )
  }

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
    CurrentUser,
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

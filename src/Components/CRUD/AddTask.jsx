import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TasksContext from "../../ContextApis/TasksContext";
import { UsersContext } from "../../ContextApis/UsersContext";
import style from "../../Styles/AddTask.module.css";
import imgUpload from "../../Images/imgUpload.svg";

function AddTask() {
  const navigate = useNavigate();
  const { addTask } = useContext(TasksContext);
  const inputRef = useRef(null);
  const { CurrentUser } = useContext(UsersContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    image: null, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!CurrentUser) {
      showSignInToastAndRedirect();
    } else {
    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description);
    formData.append("deadline", task.deadline);
    formData.append("image", task.image);
   
    const taskData = {
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      image: task.image, // Store the base64 image string
    };
  
    addTask(taskData) 
      .then(() => {
        setTask({
          title: "",
          description: "",
          deadline: "",
          image: null, // Reset the image
        });
        navigate("/Tasks");
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setTask((prev) => ({
          ...prev,
          image: base64Image,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const showSignInToastAndRedirect = () => {
    toast.error('You must sign in first');
    navigate('/User/signin'); 
  };

  return (
    <div style={{ marginTop: "9%",  borderRadius: "25px" }} className="container card text-black w-50">
      <h3 className="text-center text-dark  pt-3"> Create new Task </h3>
      <form onSubmit={handleSubmit} className="form p-3">
        <div className="row d-flex">
          <div className=" mb-3 w-50  ">
          <label htmlFor="title"> Task Name: </label> <br />
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              ref={inputRef}
              required
            /> 
          </div>

          <div className="col-6">
            <label htmlFor="deadline"> Deadline: </label>
            <br />
            <input
              type="date"
              className="form-control"
              id="deadline"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}   

              required
            />
          </div>
        </div>

        <div className="row d-flex">
          <div className="col-6  ">
            <label htmlFor="description"> Description: </label>
            <textarea 
              className="form-control "
              id="description"
              name="description" rows={10} cols={60}
              value={task.description}
              onChange={handleChange} 
            /> 
          </div>

          <div className="col-6 ">
            <div className={style.uploadField} >
              <img src={imgUpload} className="img-fluid " alt="" id="img-placeholder"  width={'450px'} />
              <img src={task.image} className="img-fluid h-auto" alt="" id="img-placeholder"  width={'250px'}  style={{position:'absolute', left:'15%', top:'15%'}}/>
              <input
                type="file" hidden
                className="form-control"
                id="image"
                name="image"
                onChange={handleImageChange}
              />
              <label htmlFor="image">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
                  <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/>
                </svg> <br />
                  Upload Image
              </label>   
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-dark mx-2 text-light px-5 py-2 b-0" style={{zIndex:1}}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;

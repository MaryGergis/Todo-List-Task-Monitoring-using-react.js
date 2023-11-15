import React, {  useContext } from "react";
import style from "../Styles/Tasks.module.css";
import TasksContext from "../ContextApis/TasksContext";
import { Link } from "react-router-dom";
import DeleteTask from "./CRUD/DeleteTask";
import { UsersContext } from "../ContextApis/UsersContext";
import taskImage from '../Images/task.png'


const Tasks = (props) => {
  const { tasks, moveTaskToInProgress, moveTaskToCompleted } = useContext(TasksContext);
  const { CurrentUser } = useContext(UsersContext);
  
  return (
    <div className={style.App} style={{ marginTop: "7%" }}>
      <div className={style.container}>
        <div className={style.todos_wrapper}>
          <div className={style.todos_list}>
            <h3 className={style.todo_title}>Todos List</h3>
            {CurrentUser ? (
              // Render user actual tasks when signed in
              tasks
                .filter((item) => item.status === "todo")
                .map((item, index) => (
                    <div className="card mb-2 me-2 ms-2" style={{ height: "150px"}} key={item.id}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <Link to={`/TaskDetails/${item.id}`} key={item.id}>
                            <img src={item.image || taskImage} alt="Task" width={"147px"} height={'146px'}/>
                          </Link>
                        </div>

                        <div className="col-md-8">
                          <div className="card-body">
                            <h6 className="card-title ps-1"> <span className="text-primary "> Title: </span> {item.title}</h6>
                            <h6 className="ms-4"> <span className="text-primary "> Due to: </span> {item.deadline}</h6>
                            <button className="border-0 mt-4 " style={{ background: "white" , marginLeft:'47%'}} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Progress">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                fill="green"
                                className="bi bi-journal-check"
                                viewBox="0 0 16 16"
                                onClick={() => moveTaskToInProgress(item.id)}
                              >
                                <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>                                                        
                              </svg>
                            </button>

                            <Link to={`/EditTask/${item.id}`} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit this Task">
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                              </svg>
                            </Link>

                            <DeleteTask taskId={item.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                )
              )
            ) : (
              // Render default content when not signed in
              <>
                <div className="card mb-3 me-2" style={{ height: "140px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={taskImage} alt="Task" width={"145px"} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title"> <span className="text-primary "> Default Task Title </span> </h5>
                        <h6 className="ms-4"> <span className="text-primary "> Due to: </span> 2024-01-01</h6>
                        <button className="border-0 mt-4" style={{ background: "white" , marginLeft:'47%'}} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Progress">
                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="green" className="bi bi-journal-check" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                          </svg>
                        </button>
                        <Link data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Task">
                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16" >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                        </Link>
                        <DeleteTask />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="card mb-3 me-2" style={{ height: "140px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={taskImage} alt="Task" width={"145px"} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title"> <span className="text-primary "> Default Task Title </span> </h5>
                        <h6 className="ms-4"> <span className="text-primary "> Due to: </span> 2024-01-01</h6>
                        <button className="border-0 mt-4" style={{ background: "white" , marginLeft:'47%'}} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Progress">
                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="green" className="bi bi-journal-check" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                          </svg>
                        </button>
                        <Link data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Task">
                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                        </Link>
                        <DeleteTask />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>


          {CurrentUser ? (
            // Render InProgress and Completed sections only when signed in
            <>
              <div className={style.todos_list}>
                <h3 className={style.todo_title} >InProgress</h3>
                {tasks
                  .filter((item) => item.status === "inProgress")
                  .map((item, index) => (
                    <div className="card mb-3 me-1 ms-1" style={{ height: "150px"}} key={item.id}>
                    {/* Render tasks in the "inProgress" status */}
                    <div className="row g-0">
                      <div className="col-md-4">
                        <Link to={`/TaskDetails/${item.id}`} key={item.id}>
                          <img src={item.image || taskImage} alt="Task" width={"145px"} height={'146px'}/>
                        </Link>
                      </div>

                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title ps-1 fs-6"> <span className="text-primary"> Title: </span>  {item.title}</h5>
                          <h6 className="ms-4"> <span className="text-primary"> Due to: </span> {item.deadline}</h6>
                          <button className="border-0 mt-2" style={{ background: "white" , marginLeft:'45%'}} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Completed">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="23"
                              fill="green"
                              className="bi bi-journal-check"
                              viewBox="0 0 16 16"
                              onClick={() => moveTaskToCompleted(item.id)}
                            >
                              <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                            </svg>
                          </button>

                          <Link to={`EditTask/${item.id}`} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Task">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="23"
                              fill="currentcolor"
                              className="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />                         
                            </svg>
                          </Link>

                          <DeleteTask taskId={item.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              <div className={style.todos_list}>
                <h3 className={style.todo_title}>Completed</h3>
                {tasks
                  .filter((item) => item.status === "completed")
                  .map((item, index) => (
                    <div className="card mb-3 me-2 ms-2" style={{ height: "150px" }} key={item.id}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <Link to={`/TaskDetails/${item.id}`} key={item.id}>
                            <img src={item.image || taskImage} alt="Task" width={"145px"} height={'146px'}/>
                          </Link>
                        </div>

                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title"> <span className="text-primary"> Title: </span> {item.title}</h5>
                            <h6 className="ms-4"> <span className="text-primary"> Due to: </span> {item.deadline}</h6>
                            <Link to={`EditTask/${item.id}`} style={{marginLeft:'67%'}} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Task">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                fill="currentcolor"
                                className="bi bi-pencil-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />                          
                              </svg>
                            </Link>

                            <DeleteTask taskId={item.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          ) : 
            <>
              <div className={style.todos_list}>
                <h3 className={style.todo_title}>InProgress</h3>
              </div>

              <div className={style.todos_list}>
                <h3 className={style.todo_title}>InProgress</h3>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Tasks;

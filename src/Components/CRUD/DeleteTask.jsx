import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TasksContext from '../../ContextApis/TasksContext'

const DeleteTask = ({ taskId }) => {
  const navigate = useNavigate();
  const { deleteTask } = useContext(TasksContext);

  const handleDeleteTask = () => {
    deleteTask(taskId); 
    navigate('/tasks'); 
  };

  return (
    <button className="border-0 " onClick={handleDeleteTask} style={{ background: 'white' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Task">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="25"
        fill="red"
        className="bi bi-trash-fill"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
      </svg>
    </button>
  );
};

export default DeleteTask;

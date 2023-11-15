import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import TasksContext from '../../ContextApis/TasksContext';
import taskImage from '../../Images/task.png'

const TaskDetails = () => {
  const { id } = useParams();
  const { getTaskById } = useContext(TasksContext);
  const [taskItem, setTaskItem] = useState({});

  useEffect(() => {
    getTaskById(id)
      .then((taskData) => {
        console.log('Task Data:', taskData);
        setTaskItem(taskData);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  }, [id, getTaskById]);

  if (!taskItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container " style={{ width: '60%', marginTop: '12%' }}>
      <div className="card mb-3">
        <div className="row g-0" key={taskItem.id}>
          <div className="col-md-6 w-50">
            <img src={taskItem.image || taskImage} className="img-fluid rounded-start w-auto" alt="..." />
          </div>

          <div className="col-md-6">
            <div className="card-body">
              <h4 className="card-title"> <span className="text-primary"> Title: </span> {taskItem.title}</h4>
              <h5 className="card-text"> <span className="text-primary"> Due to: </span> {taskItem.deadline}</h5>
              <p className="card-text"> <span className="text-primary fw-bold"> Notes: </span>{taskItem.description}</p>
              <Link to={'/tasks'}>
                <button className='btn btn-dark'> Go to Tasks </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

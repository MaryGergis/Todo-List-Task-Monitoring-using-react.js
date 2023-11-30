import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

import UsersProvider from './ContextApis/UsersProvider';
import { TasksContextProvider } from './ContextApis/TasksContext';
import Navbar from './Components/Navbar';
import NotFoundPage from './Components/NotFoundPage';

const SignIn =  lazy(() => import('./Components/User/SIgnIn'));
const SignUp =  lazy(() => import('./Components/User/SignUp'));
const Home =  lazy(() => import('./Components/Home'));
const Tasks =  lazy(() => import('./Components/Tasks'));
const AddTask =  lazy(() => import('./Components/CRUD/AddTask'));
const TaskDetails =  lazy(() => import('./Components/CRUD/TaskDetails'));
const EditTasks =  lazy(() => import('./Components/CRUD/EditTask'));
const EditUserAccount =  lazy(() => import('./Components/CRUD/EditUserAccount'));

function App() {
  return (
      <Fragment>
        <Suspense
          fallback={
            <div className="spinner-border text-center text-primary" role="status" style={{ marginLeft: '50%' }}>
              <span className="visually-hidden ">Loading...</span>
            </div>
          }>

          <UsersProvider>
            <BrowserRouter>
              <ToastContainer autoClose={3000} />
              <Navbar/>
              <TasksContextProvider>
              <Routes>
                {["Home", "/", "Todo-List-Task-Monitoring-using-react.js"].map((path, index) => (
                  <Route path={path} element={<Home />} key={index} />
                ))}

                <Route path="/User/signin" element={<SignIn />} />
                <Route path="/User/signup" element={<SignUp />} />
                <Route path="/Tasks" element={<Tasks />} />
                <Route path="/AddTask" element={<AddTask />} />
                <Route path="/TaskDetails/:id" element={<TaskDetails />} />
                <Route path="/EditTask/:id" element={<EditTasks />} />
                <Route path="/EditAccount/:id" element={<EditUserAccount />} />
                <Route path="*" element={<NotFoundPage />} />

              </Routes>
            </TasksContextProvider>
          </BrowserRouter>
        </UsersProvider>
      </Suspense>
    </Fragment>
  );
}

export default App;

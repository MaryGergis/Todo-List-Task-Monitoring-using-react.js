import React , {useContext} from 'react';
import { Link , NavLink, useLocation} from 'react-router-dom';
import {UsersContext} from '../ContextApis/UsersContext'
import style from '../Styles/Navbar.module.css'

const Navbar = (props) => {
  const { CurrentUser } = useContext(UsersContext);
  const location = useLocation(); // Get the current location

  // Check if the current location is either /User/signin or /User/signup
  const isSignInOrSignUp = location.pathname === '/User/signin' || location.pathname === '/User/signup';

  // Conditionally render the Navbar
  if (isSignInOrSignUp) {
    return null;
  }

  return (
    <header className=" d-flex  py-3 px-4 bg-dark container-fluid position-fixed top-0" style={{zIndex:1}}>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <div className="d-flex  gap-2 ">
          <img src={require("../Images/logo.png")} alt="our logo" width={'50px'} />
          <h2 className="m-0 p-0">TODO</h2>
        </div>
      </Link>

      <div className="navs" style={{marginLeft:'50%'}}>
        <ul className=" d-flex gap-4 align-items-center p-0 m-0" style={{listStyleType:'none'}}>
          <li>
            <NavLink className="nav-link fs-5 text-light me-3 " to="/AddTask">
              <span className={style.AddTask}> Add New Task </span>
            </NavLink>
          </li>

          <li>
            <NavLink className="nav-link fs-5 text-light" to="/tasks">
            <span className={style.task}> Tasks    </span>

            </NavLink>
          </li>

          {CurrentUser !== null ? (
            <li className="nav-item m-auto p-auto">
              <button className="btn btn-outline-secondary py-2 pe-4 ms-3" >
                <Link to={`EditAccount/${CurrentUser.id}`} className="nav-link text-light fw-bold ">
                  <span>
                    <img src={CurrentUser?.image || require("../Images/user.jpg")} alt="" width={'40px'} style={{ borderRadius: '50%' }} />
                  </span>
                  <span className='ms-1 '> {CurrentUser?.userName} </span>
                </Link>
              </button>
            </li>
          ) : (
            <li className={`nav-item`}>
              <div className="btn-group ms-5">
                <button className="btn btn-outline-secondary mt-2 text-light">
                  <Link to="/User/signin" className="nav-link text-Light fw-bold p-1  ">
                    SignIn
                  </Link>
                </button>

                <button className="btn btn-light mt-2">
                  <Link to="/User/signup" className="nav-link  fw-bold p-1">
                    SignUp
                  </Link>
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
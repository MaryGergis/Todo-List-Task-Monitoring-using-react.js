import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SignUp = (props) => {
    const navigate = useNavigate();
    const [id, idchange] = useState("");   //email
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [userName, userNamechange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("Egypt");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const IsValidate = () => {
        let isproceed = true;
    
        let errormessage = "Please enter the value in ";
        if (id === "" || id === null) {
          isproceed = false;
          errormessage += "Email,";
        }
        if (name === "" || name === null) {
          isproceed = false;
          errormessage += " Fullname,";
        }
        if (password === "" || password === null) {
          isproceed = false;
          errormessage += " Password,";
        }
        if (userName === "" || userName === null) {
          isproceed = false;
          errormessage += " Username";
        }
    
        if (!isproceed) {
          toast.warning(errormessage);
        } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(id)) {
          isproceed = false;
          toast.warning("Please enter a valid email!");
        }
        return isproceed;
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        // Check if the user already exists
        fetch("http://localhost:2000/User/" + id)
        .then((res) => res.json())
        .then((user) => {
            if (Object.keys(user).length > 0) {
            toast.warning("User already exists!. signin!");
            } else

            {
                // User does not exist, proceed with registration
                let regobj = {
                    id,  //email
                    name,
                    password,
                    userName,
                    phone,
                    country,
                    role: "user",
                };
                
                if (IsValidate()) {
                    fetch("http://localhost:2000/User", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(regobj),
                    })
                    .then((res) => {
                        toast.success("Registered successfully!"); // Display success toast
                        navigate("/User/signin");
                        })
                        .catch((err) => {
                        toast.error("Failed: " + err.message);
                    });
                }
            }
        })

        .catch((err) => {
            toast.error("Failed: " + err.message);
        });
    };
    

    return (
        <section style={{ backgroundColor: "#eee", height:'650px' }} >
            <div className="container">
                <div className="row d-flex">
                    <div className="col-lg-12 col-xl-12">
                        <div className="card text-black mt-5 mb-4" style={{ borderRadius: "25px" , marginLeft:'10%', width:'80%'}}>
                            <div className="card-body ">
                                <div className="row d-flex p-4" >
                                    <p className="text-center h1 fw-bold mb-4 mt-1" >Sign up</p>
                                    <div className="col-md-10 col-lg-6 col-xl-6 order-2 order-lg-1 ">
                                        <form onSubmit={handlesubmit}>
                                            <div className="row ">
                                                <div className="flex-row col-6">
                                                    <div className="form-outline flex-fill ">
                                                        <label className="form-label ms-3" htmlFor="form3Example1c">
                                                            User Name: 
                                                        </label> <ToastContainer/>
                        
                                                        <div className="d-flex ">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" className="bi bi-person-fill col-1 me-1" viewBox="0 0 16 16">
                                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                                            </svg>
                            
                                                            <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control" 
                                                            onChange={(e) => userNamechange(e.target.value)}
                                                            value={userName}
                                                            /> 
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div className="flex-row  mb-3 col-6">
                                                    <div className="form-outline flex-fill">
                                                        <label className="form-label  ms-3" htmlFor="form3Example4c">Password: </label>
                                                        <div className="d-flex ">
                                                            <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="25"
                                                            fill="currentColor"
                                                            className="bi bi-lock-fill col-1 me-1"
                                                            viewBox="0 0 16 16"
                                                            >
                                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                                            </svg>
                                                            
                                                            <input
                                                            type={showPassword ? "text" : "password"} // Toggle password visibility
                                                            id="form3Example4c"
                                                            className="form-control"
                                                            value={password}
                                                            onChange={(e) => passwordchange(e.target.value)}
                                                            />
                        
                                                            <div
                                                                className="bi bi-eye-slash"
                                                                onClick={togglePasswordVisibility}
                                                                style={{ cursor: "pointer", marginLeft: "-30px", marginTop: "5px" }}
                                                            >

                                                                {showPassword ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                                                    </svg>
                                                                ) : (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div className="row  ">
                                                <div className=" flex-row  mb-3 col-6">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label  ms-3" htmlFor="form3Example2c">Full Name: </label> <ToastContainer/>
                        
                                                        <div className="d-flex">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" className="bi bi-pencil-square col-1 me-1" viewBox="0 0 16 16">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg>
                        
                                                            <input 
                                                                type="text" 
                                                                id="form3Example2c" 
                                                                className="form-control col-12" 
                                                                onChange={(e) => namechange(e.target.value)}
                                                                value={name}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div className=" flex-row  mb-3 col-6 ">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label  ms-3" htmlFor="form3Example3c">Your Email: </label> <ToastContainer/>
                                                    
                                                        <div className="d-flex ms-3">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" className="bi bi-envelope-fill col-1  me-1" viewBox="0 0 16 16">
                                                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                                                            </svg>
                        
                                                            <input 
                                                                type="email" 
                                                                id="form3Example3c" 
                                                                className="form-control col-12" 
                                                                value={id}
                                                                onChange={(e) => idchange(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                    

                                            <div className="row ">
                                                <div className=" flex-row  mb-3 col-6">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label  ms-3" htmlFor="form3Example5c"> Phone Number: </label> <ToastContainer/> 
                                                        
                                                        <div className="d-flex">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" className="bi bi-telephone-inbound-fill col-1 me-1" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0z"/>
                                                            </svg>
                                                            <input 
                                                                id="form3Example5c" 
                                                                className="form-control col-12" 
                                                                value={phone}
                                                                onChange={(e) => phonechange(e.target.value)}
                                                            /> 
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div className=" flex-row  mb-3 col-6">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label  ms-3" htmlFor="form3Example6c"> Country: </label> <ToastContainer/> 
                                                        
                                                        <div className="d-flex ms-3">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" className="bi bi-geo-alt-fill col-1 me-1" viewBox="0 0 16 16">
                                                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                                            </svg>
                        
                                                            <select 
                                                                id="form3Example6c" 
                                                                className="form-control col-12" 
                                                                value={country}
                                                                onChange={(e) => countrychange(e.target.value)}
                                                                >
                                                                <option value="Egypt"> Egypt </option>
                                                                <option value="usa"> USA </option>
                                                                <option value="dubi"> dubi </option>
                                                            </select>
                                                            <ToastContainer />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                    
                                            <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-3 mt-2">
                                                <button type="submit" className="btn btn-dark btn-lg">
                                                    Create an account
                                                </button>
                                            </div>
                                        </form>
        
                                        <label>Already a member? </label>
                                        <Link
                                            to="/User/signin"
                                            style={{
                                            color: "blue",
                                            fontSize: "20px",
                                            textDecorationLine: "none",
                                            }}>
                                            Sign In
                                        </Link>
                                    </div>
                                    <br />
        
                                    <div className="col-md-4 col-lg-4 col-xl-6  order-1 order-lg-2 " >
                                        <img
                                            src={require("../../Images/signin&signup.png")}
                                            className="img-fluid w-100"
                                            alt="Sign-Up"    
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
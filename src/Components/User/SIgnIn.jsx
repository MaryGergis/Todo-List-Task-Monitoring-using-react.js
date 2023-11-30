import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsersContext } from "../../ContextApis/UsersContext";

const SignIn = (props) => {
    const { handleUser } = useContext(UsersContext);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Add state for showing/hiding password
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const proceedSignIn = (e) => {
        e.preventDefault();
        if (validate()) {
          fetch("http://localhost:2000/User/" + id)
            .then((res) => res.json())
            .then((resp) => {
                if (Object.keys(resp).length === 0) {
                    toast.error("Please sign up or enter a valid email address");
                } else {
                if (resp.password === password) {
                    sessionStorage.setItem("user", JSON.stringify(resp));
                    handleUser(resp);
                    navigate("/Home");
                    toast.success("Signed in successfully!");
                } else {
                    toast.error("Password is not correct!!");
                }
              }
            })
            .catch((err) => {
              toast.error("Sign-in failed due to: " + err.message);
            });
        }
    };

    const validate = () => {
        let result = true;
        if (id === "" || id === null) {
          result = false;
          toast.warning("Please enter an email address.");
        }
        if (password === "" || password === null) {
          result = false;
          toast.warning("Please enter a password.");
        }
        return result;
    };
    
    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container">
            <div className="row d-flex">
                <div className="col-lg-12 col-xl-12" style={{ marginTop: "5%" }}>
                    <div className="card text-black mt-4 " style={{ borderRadius: "25px", marginLeft: "15%", width: "65%" }}>
                        <div className="card-body p-5">
                            <div className="row d-flex">
                                <p className="text-center h1 fw-bold mb-4 mt-2 pt-2">Sign in</p>
                                
                                <div className="col-md-10 col-lg-6 col-xl-6 order-2 order-lg-1">
                                    <form onSubmit={proceedSignIn}>
                                        <div className="d-flex flex-row mb-3 col-10 ms-3">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label ms-4" htmlFor="form3Example1c">
                                                    Email Address:
                                                </label>
                                                
                                                <div className="d-flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-envelope-at-fill me-2" viewBox="0 0 16 16">
                                                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z"/>
                                                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z"/>
                                                    </svg>
                                                
                                                    <input
                                                    type="text"
                                                    id="form3Example1c"
                                                    className="form-control"
                                                    onChange={(e) => setId(e.target.value)}
                                                    value={id}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-3 col-10 ms-3">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label ms-4" htmlFor="form3Example4c">
                                                    Password:
                                                </label>
                                                
                                                <div className="d-flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-lock-fill me-1 mt-1" viewBox="0 0 16 16">
                                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                                    </svg>
                                                
                                                    <input
                                                    type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                                                    id="form3Example4c"
                                                    className="form-control w-100"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                
                                                    <div
                                                        className="bi bi-eye-slash"
                                                        onClick={togglePasswordVisibility}
                                                        style={{ cursor: "pointer", marginLeft: "-30px", marginTop: "5px" }}
                                                    >
                                                        {showPassword ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
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

                                        <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-3">
                                            <button type="submit" className="btn btn-dark btn-lg">
                                                Sign in
                                            </button>
                                        </div>

                                        <label>Not a member?</label>
                                        <Link
                                            to="/User/signup"
                                            style={{
                                            color: "blue",
                                            fontSize: "20px",
                                            textDecoration: "none",
                                            }}
                                        >
                                            Sign Up
                                        </Link>
                                    </form>
                                </div>

                                <div className="col-md-4 col-lg-4 col-xl-6 order-1 order-lg-2">
                                    <img
                                        src={require("../../Images/signin&signup.png")}
                                        className="img-fluid w-100"
                                        alt="SignIn image5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </section>
    );
};

export default SignIn;
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {UsersContext } from '../../ContextApis/UsersContext';
import axios from 'axios';
import userImage from '../../Images/user.jpg'; 
import style from '../../Styles/EditUserAccount.module.css'
import { toast } from 'react-toastify';

const EditUserAccount = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const { id } = useParams();
    const { CurrentUser, editUser, DeleteUser , currentUserReset} = useContext(UsersContext); 

    const [user, setUser] = useState({
        id: id,
        name: '',
        userName: '',
        phone: '',
        image: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/User/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const placeholder = document.querySelector("#img");
        placeholder.src = URL.createObjectURL(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            setUser((prevUser) => ({
            ...prevUser,
            image: base64Image,
            }));
        };
        reader.readAsDataURL(file);
        }
    };

    const deleteUserhandler = () => {
        if (window.confirm("Are you sure?")) {
        DeleteUser(CurrentUser?.id);
        navigate("/Home");
        }
    };

    const handleSubmit = (e) => {
        editUser(user.id, user);
        e.preventDefault();
        toast.success("Updated Successfully")
    };

    const UserSignOut=()=>{
        currentUserReset();
        navigate("/Home");
    }

    return (
        <div style={{ marginTop: "8%",  borderRadius: "25px" }} className="container card text-black w-50">
            <form onSubmit={handleSubmit} className="form p-3">
                <div className='d-flex row ' >
                    <div className='col-6'>
                        <div>
                            <img src={CurrentUser?.image || userImage} className='img-fluid w-100' id='img'  alt='user image1' style={{borderRadius:'50%'}}  />
                        </div>

                        <input type="file" hidden id="pic" onChange={handleImageChange} />
                        <label className="mt-3 img-lbl btn btn-primary" htmlFor="pic" style={{marginLeft:'30%'}}>
                            Change Image
                        </label>
                    </div>


                    <div className='col-6'>
                        <div className=" mb-3">
                            <label htmlFor="title" className={style.label}> User Name: </label> 
                            <input required
                            type="text"
                            className={style.input}
                            id="title"
                            name="userName"
                            value={user.userName}
                                onChange={handleChange}
                                ref={inputRef}
                            /> 
                        </div>

                        <div className=" mb-3">
                            <label htmlFor="fullName" className={style.label}> Full Name: </label> 
                            <input required
                            type="text"
                            className={style.input}
                            id="fullName"
                            name="name"
                            value={user.name}
                                onChange={handleChange}
                            /> 
                        </div>

                        <div className=" mb-3">
                            <label htmlFor="email" className={style.label}> Email Address: </label> 
                            <input
                            type="email"
                            className={style.input}
                            id="email"
                            name="email"
                            value={user.id}
                                onChange={handleChange} disabled
                            /> 
                        </div>

                        <div >
                            <label htmlFor="phone" className={style.label}> Phone Number: </label> 
                            <input
                            type="number"
                            className={style.input}
                            id="phone"
                            name="phone"
                            value={user.phone}
                                onChange={handleChange}
                            /> 
                        </div>

                        <button className='btn btn-primary  mt-4 ms-5' style={{marginLeft:'10%'}}>
                            Update your Profile
                        </button>
                    </div>

                    <div className='d-flex mt-5 ' style={{marginLeft:'20%'}}>
                        <button className="btn btn-dark mx-3 w-25" onClick={UserSignOut}>Sign Out</button>

                        <button className='btn  ms-3 w-25 text-light' onClick={deleteUserhandler} style={{background:'#ff8c00'}}>
                            Delete Account
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditUserAccount;
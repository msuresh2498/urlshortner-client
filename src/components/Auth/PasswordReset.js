import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { API } from '../../global';
import { TextField } from '@mui/material';

const PasswordReset = () => {

    const { id, token } = useParams();

    const history = useNavigate();

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const userValid = async () => {
        const res = await fetch(`${API}/user/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()

        if (data.status === 201) {
            console.log("user valid")
        } else {
            history("*")
        }
    }


    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API}/user/${id}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        });

        const data = await res.json()

        if (data.status === 201) {
            setPassword("")
            setMessage(true)
            history('/login')
        } else {
            toast.error("! Token Expired generate new LInk", {
                position: "top-center"
            })
        }

    }

    useEffect(() => {
        userValid()
    },)
    return (
        <div>
            <div className='signup-section'>
                <div className='signup-container'>
                    <h2 className='login-heading'>Enter your new Password</h2>
                    <form className='signup-form'>
                        {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfully Updated </p> : ""}
                        <TextField
                            className='textfield'
                            label="Password"
                            variant="outlined"
                            name='password'
                            type='password'
                            onChange={setval}
                            value={password}
                        />
                        <button className='auth-btn' type='submit' variant="contained" onClick={sendpassword}>submit</button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default PasswordReset
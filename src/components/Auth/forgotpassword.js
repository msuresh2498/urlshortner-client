import { Alert, TextField } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { API } from '../../global';

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendLink = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API}/user/sendpasswordlink`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json();
        console.log(data)

        if (data.status === 201) {
            setEmail("");
            setMessage(true)
        } else {
            toast.error("Invalid User")
        }
    }

    return (
        <div>
            <div className='signup-section'>
                <div className='signup-container'>
                    {message ? <Alert severity="success" className='reset-msg'>Password Reset link send Successfully in Your Email</Alert> : null}
                    <h2 className='login-heading'>Enter your Email</h2>
                    <form className='signup-form'>
                        <TextField
                            className='textfield'
                            label="Email"
                            variant="outlined"
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button className='auth-btn' type='submit' onClick={sendLink} variant="contained">send</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgotpassword
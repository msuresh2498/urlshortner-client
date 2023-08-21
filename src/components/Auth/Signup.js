import { TextField } from '@mui/material'
import React from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { API } from '../../global';

const formValidationSchema = Yup.object({
    firstname: Yup.string().max(25).required("name is Required🙂"),
    lastname: Yup.string().max(25).required("name is Required🙂"),
    email: Yup.string().min(6).required("Email is Required🙂"),
    password: Yup.string().min(8).required("Need bigger Password🙂"),
});

const Signup = () => {
    const navigate = useNavigate();

    const { handleBlur, handleChange, values, touched, errors, handleSubmit } = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",

        },
        //User Registration
        validationSchema: formValidationSchema,
        onSubmit: data => {
            axios.post(`${API}/user/signup`, data)
                .then(res => navigate('/'))
                .catch(err => {
                    toast.error(err.response.data);
                })
        }
    })


    return (
        <div>
            <div className='signup-section'>
                <div className='signup-container'>
                    <h2 className='login-heading'>signup</h2>
                    <form className='signup-form' onSubmit={handleSubmit}>
                        <TextField
                            className='textfield'
                            label="First Name"
                            variant="outlined"
                            name='firstname'
                            onChange={handleChange}
                            value={values.firstname}
                            onBlur={handleBlur}
                            error={touched.firstname && errors.firstname}
                            helperText={touched.firstname && errors.firstname ? errors.firstname : null} />

                        <TextField
                            className='textfield'
                            label="Last Name"
                            variant="outlined"
                            name='lastname'
                            onChange={handleChange}
                            value={values.lastname}
                            onBlur={handleBlur}
                            error={touched.lastname && errors.lastname}
                            helperText={touched.lastname && errors.lastname ? errors.lastname : null} />

                        <TextField
                            className='textfield'
                            label="Email"
                            variant="outlined"
                            name='email'
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}
                            error={touched.email && errors.email}
                            helperText={touched.email && errors.email ? errors.email : null} />

                        <TextField
                            className='textfield'
                            label="Password"
                            type='password'
                            variant="outlined"
                            name='password'
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur}
                            error={touched.password && errors.password}
                            helperText={touched.password && errors.password ? errors.password : null} />

                        <button className='auth-btn' type='submit' variant="contained">submit</button>
                        <p>you already have an account?
                            <Link to='/login' className='auth-link'>  Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
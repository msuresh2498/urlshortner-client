import { Alert, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { API } from '../../global';
import { UserContext } from './Authorization';


const formValidationSchema = Yup.object({
  email: Yup.string().min(6).required("Email is Required🙂"),
  password: Yup.string().min(8).required("Need bigger Password🙂"),
});


const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState()

  const { handleBlur, handleChange, values, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    //Login Authendication
    validationSchema: formValidationSchema,
    onSubmit: async (data) => {
      await axios.post(`${API}/user/login`, data)
        .then(res => {
          localStorage.setItem('token', res.data.token);
          console.log(res.data);
          setUser(res.data)
          alert('login successfully')
          navigate('/')
        })
        .catch(err => {
          toast.error(err.response.data)
          setMessage(true);
        })

    },
  })

  return (
    <div>
      <div className='signup-section'>
        <div className='signup-container'>
          <h2 className='login-heading'>login</h2>
          <form className='signup-form' onSubmit={handleSubmit}>
            {message ? <Alert severity="error" className='reset-msg'>invalid credentials</Alert> : null}
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

            <TextField className='textfield'
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
            <p>you don't have an account?
              <Link to='/signup' className='auth-link'>  Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
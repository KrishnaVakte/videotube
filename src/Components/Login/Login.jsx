import React, { useEffect, useState } from 'react'
import "./Login.css"
import LoginLogo from "../../assets/login.gif"
import { host } from '../../data';
import axios from "axios"
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true



const Login = ({user, setUser}) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({})

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${host}/user/login`, credentials)
            
            if (response.data.success) {
                setUser(response.data.data.user);
                navigate('/')
            }
            else {
                alert("Invalid Credentials.")
            }
        } catch (error) {
            console.log("unable to login...")
        }
    }

    useEffect(() => {
        if (user.username) {
           navigate('/')
       }
   },[user])

    return (
        <div className='login-page'>
            <form className="login-window">
                <img src={LoginLogo} alt="" />
                <h3>Login</h3>
                <div>
                    <label htmlFor="username">Username </label>
                    <input type="text" id='username' name='username' onChange={onChangeHandler} />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" id='password' name='password' onChange={onChangeHandler} />
                </div>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Login

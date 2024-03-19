import React, { useEffect, useState } from 'react'
import "./Login.css"
import LoginLogo from "../../assets/login.gif"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';



const Login = ({setUser}) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({})
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth?.loading)

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(loginUser(credentials));
    }
    
    if (loading) {
        return <div>Loading...</div>
    }

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

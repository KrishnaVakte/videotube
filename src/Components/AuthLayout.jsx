import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../store/slices/authSlice';
import Loader from './Loader/Loader';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, authentication }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const loading = useSelector(state => state.auth.loading);
    const user = useSelector(state => state.auth.userData);
    
    useEffect(() => {
        dispatch(getUser());
    },[dispatch])

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
    }, [authStatus, navigate, authentication])

    if (loading) {
        return <Loader/>
    }

    return children 
}

export default AuthLayout

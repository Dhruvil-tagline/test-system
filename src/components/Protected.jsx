import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios';

const Protected = ({ children }) => {
    const value = document.cookie;
    const parts = value.split(`token=`);
    let token = parts[parts.length - 1];
    const getToken = async () => {
        try {

            const output = await axios({
                url: 'https://examination.onrender.com/users/newPassword',
                method: 'GET',
                headers: {
                    "access-token": token
                }
            })
            const response = await output.data;
            if (response.statusCode === 200) {
                console.log(response)
            }
            else {
                document.cookie =('token =')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        token && getToken();
    },[])
    return (
        (!!token ? children : <Navigate to='/login' />)
    )
}

export default Protected

import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
    let auth = true;
    return (
        (auth ? children : <Navigate to='/login' />)
    )
}

export default Protected

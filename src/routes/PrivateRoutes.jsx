import React from 'react'
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const token = sessionStorage.getItem("authToken");
    
    if(!token){
        return <Navigate to="/login" />
    }

    return children;
}

export default PrivateRoutes
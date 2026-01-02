import React from 'react'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const PrivateRoutes = ({children}) => {
    const token = sessionStorage.getItem("authToken");
    const {t} = useLang();
    
    if(!token){
        toast.error(t("need_login"));
        return <Navigate to="/" />
    }

    return children;
}

export default PrivateRoutes
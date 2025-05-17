import React, { useContext, useEffect } from "react";
import { AuthContext } from "../store/Auth";
import { Navigate } from "react-router-dom";

const Logout=()=>{
    const {LogoutUser,isLoggedIn}=useContext(AuthContext)
    
    const refreshing=()=>{
        window.location.reload(false)
    }
    useEffect(()=>{
        LogoutUser()
        // refreshing()
    },[LogoutUser])
        

   
    return(
        <>
            <Navigate to="/login"></Navigate>
        </>
    )
}
export default Logout
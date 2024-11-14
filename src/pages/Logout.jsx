import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Alerts from "../../hooks/Alerts"
function Logout() {
    const navigate = useNavigate()
    const handleSessionClose = () =>{
        axios.delete("http://localhost:3000/user",{withCredentials:true})
        .then((res)=> res.status == 202 && navigate("/"))
        .catch((res)=>Alerts({title:"Error",message:"No tienes una sesión iniciada.",icon:"error"}))
      }
    useEffect(() => {
       handleSessionClose()
    }, [])
    
    return(
        <>
        <p className='flex-1 place-content-center'>Redireccionando...</p>
        </>
    )
}

export default Logout
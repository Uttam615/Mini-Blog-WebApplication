import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Logout.css'

const Logout = () => {
  const naviagte = useNavigate()
  useEffect(()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    naviagte('/login')
  },[naviagte]);
  return (
    <div>
        <h2>Logging Out</h2>

    </div>
  )
}

export default Logout

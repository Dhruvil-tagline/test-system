import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ButtonCom from '../CommonComponent/ButtonCom'

const TeacherPage = () => {
   const handleLogout = () => {
      document.cookie = ('token =')
      navigate('/login')
      toast.success('Logout Successfully')
    }
  return (
    <div>
      <nav style={{ display: 'flex', background: 'black', justifyContent: "space-between", alignItems:"center", padding:"10px 5%",}}>
        <div style={{display:'flex', gap:'40px'}}>
        <NavLink to='/teacher/dashboard'>Dashboard</NavLink>
        <NavLink to='/teacher/student'>Student</NavLink>
        <NavLink to='/teacher/profile'>Profile</NavLink>
        </div>
      <div>
        <ButtonCom onClick={handleLogout} text='Logout' />
      </div>
      </nav>
      <h1>Teacher Page</h1>
      <Outlet/>
    </div>
  )
}

export default TeacherPage

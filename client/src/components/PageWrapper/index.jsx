import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const PageWrapper = () => {
  return (
    <>
    <header>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="login">Login/Signup</NavLink>
        </nav>
    </header>
    <Outlet/>
    </>
  )
}

export default PageWrapper

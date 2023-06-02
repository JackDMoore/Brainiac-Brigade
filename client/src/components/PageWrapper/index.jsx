import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "../PageWrapper/index.css"

const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : "none"})

const PageWrapper = () => {
  return (
    <>
      <header>
          <nav>
              <img src='../src/assets/Calendar-logo.png' id='logo'></img>
              <NavLink to="home" id='link' style={styles}>Home</NavLink>
              <NavLink to="login" id='link' style={styles}>Login</NavLink>
              <NavLink to="home/calendar" id='link' style={styles}>Calendar</NavLink>
          </nav>
      </header>
      <Outlet/>
    </>
  )
}

export default PageWrapper

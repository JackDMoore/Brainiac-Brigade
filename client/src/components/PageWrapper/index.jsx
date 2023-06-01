import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const PageWrapper = () => {
  return (
    <>
      <header>
          <nav>
              <NavLink to="home">Home</NavLink>
              <NavLink to="login">Login</NavLink>
              <NavLink to="home/calendar">Calendar</NavLink>
          </nav>
      </header>
      <Outlet/>
    </>
  )
}

export default PageWrapper

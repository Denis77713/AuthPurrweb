import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Navigation() {
    return(
        <> 
        {/* Контент */}
          <Outlet/>
          <div>
            <NavLink to="/" >Menu</NavLink>
            <br />
            <NavLink to="/singin" >singin</NavLink>
            <br />
            <NavLink to="/aboutme" >AboutMe</NavLink>
            <br />
            <NavLink to="/singup" >singup</NavLink>
          </div>
        </>
    )
}

export default Navigation

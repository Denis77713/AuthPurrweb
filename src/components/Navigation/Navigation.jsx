import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Navigation() {
    return(
        <> 
        {/* Контент */}
          <Outlet/>
          <div>
            <NavLink to="/" >Main</NavLink>
            <br />
            <NavLink to="/singin" >SingIn</NavLink>
            <br />
            <NavLink to="/aboutme" >AboutMe</NavLink>
            <br />
            <NavLink to="/singup" >SingUp</NavLink>
          </div>
        </>
    )
}

export default Navigation

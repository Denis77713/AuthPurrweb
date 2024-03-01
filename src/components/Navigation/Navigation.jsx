import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Navigation() {
    return(
        <> 
        {/* Контент */}
          <Outlet/>
          <div>
            {/* native */}
            <NavLink to="/" >Menu</NavLink>
            <br />
            {/* styled component */}
            <NavLink to="/singin" >Cart</NavLink>
          </div>
        </>
    )
}

export default Navigation

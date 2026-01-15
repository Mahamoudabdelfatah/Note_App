import React from 'react'
import Navbar from '../NavbarComponent/NavbarComponent.jsx'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../NavbarComponent/NavbarComponent.jsx'

const Layout = () => {
    return (
        <div>
            <NavbarComponent />
            <Outlet />
        </div>
    )
}

export default Layout

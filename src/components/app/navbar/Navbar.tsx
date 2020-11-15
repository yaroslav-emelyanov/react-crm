import React from 'react'
import NavbarDropdown from './NavbarDropdown'
import NavbarLeft from './NavbarLeft'

const Navbar = () => (
  <nav className="navbar orange lighten-1">
    <div className="nav-wrapper">
      <NavbarLeft />
      <NavbarDropdown />
    </div>
  </nav>
)

export default Navbar

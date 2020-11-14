import React from 'react'
import NavbarDropdown from './NavbarDropdown'
import { useDispatch } from 'react-redux'
import { action } from '../../store/rootActions'

const Navbar = () => {
  const dispatch = useDispatch()

  const openSidebar = () => {
    dispatch(action.openSidebar())
  }

  return (
    <nav className="navbar orange lighten-1">
      <div className="nav-wrapper">
        <div className="navbar-left">
          <a href="/#" onClick={openSidebar}>
            <i className="material-icons black-text">dehaze</i>
          </a>
          <span className="black-text">12.12.12</span>
        </div>
        <NavbarDropdown />
      </div>
    </nav>
  )
}

export default Navbar

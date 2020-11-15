import React from 'react'
import { useDispatch } from 'react-redux'
import { action } from '../../../store/rootActions'
import { useTimer } from '../../../utils/hooks'
import { dateFilter } from '../../../utils/filters'

const NavbarLeft = () => {
  const dispatch = useDispatch()
  const time = useTimer()

  const openSidebar = (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(action.openSidebar())
  }

  return (
    <div className="navbar-left">
      <a href="/#" onClick={openSidebar}>
        <i className="material-icons black-text">dehaze</i>
      </a>
      <span className="black-text">{dateFilter(time, 'datetime')}</span>
    </div>
  )
}

export default NavbarLeft

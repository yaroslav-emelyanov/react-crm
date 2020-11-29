import React, { useEffect, useRef } from 'react'
import { AppPath } from '../../../utils/enums'
import { NavLink } from 'react-router-dom'
import { Dropdown } from 'materialize-css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootState'
import { useHistory } from 'react-router-dom'
import { action } from '../../../store/rootActions'

const NavbarDropdown = () => {
  const { name } = useSelector((state: RootState) => state.info)
  const refDropdown = useRef<HTMLAnchorElement>(null)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    let dropdown: Dropdown | undefined
    if (refDropdown.current) dropdown = Dropdown.init(refDropdown.current)
    return () => dropdown?.destroy()
  }, [])

  const logout = (e: React.SyntheticEvent) => {
    e.preventDefault()
    history.push(AppPath.login + '?message=logout')
    dispatch(action.logout())
  }

  return (
    <ul className="right hide-on-small-and-down">
      <li>
        <a
          className="dropdown-trigger black-text"
          href="/#"
          data-target="dropdown"
          ref={refDropdown}
        >
          {name || '-'}
          <i className="material-icons right">arrow_drop_down</i>
        </a>

        <ul id="dropdown" className="dropdown-content">
          <li>
            <NavLink to={AppPath.profile} className="black-text">
              <i className="material-icons">account_circle</i>Профиль
            </NavLink>
          </li>
          <li className="divider" tabIndex={-1} />
          <li>
            <a href="/#" onClick={logout} className="black-text">
              <i className="material-icons">assignment_return</i>Выйти
            </a>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default NavbarDropdown

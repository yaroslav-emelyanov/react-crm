import React, { useEffect, useRef } from 'react'
import { AppPath } from '../../../utils/enums'
import { NavLink } from 'react-router-dom'
import { Dropdown } from 'materialize-css'

const NavbarDropdown = () => {
  const refDropdown = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    let dropdown: Dropdown | undefined
    if (refDropdown.current) dropdown = Dropdown.init(refDropdown.current)
    return () => dropdown?.destroy()
  }, [])

  return (
    <ul className="right hide-on-small-and-down">
      <li>
        <a
          className="dropdown-trigger black-text"
          href="/#"
          data-target="dropdown"
          ref={refDropdown}
        >
          USER NAME
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
            <NavLink
              to={AppPath.login + '?message=logout'}
              className="black-text"
            >
              <i className="material-icons">assignment_return</i>Выйти
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default NavbarDropdown

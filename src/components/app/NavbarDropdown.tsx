import React from 'react'

const NavbarDropdown = () => {
  return (
    <ul className="right hide-on-small-and-down">
      <li>
        <a
          className="dropdown-trigger black-text"
          href="#"
          data-target="dropdown"
        >
          USER NAME
          <i className="material-icons right">arrow_drop_down</i>
        </a>

        <ul id="dropdown" className="dropdown-content">
          <li>
            <a href="#" className="black-text">
              <i className="material-icons">account_circle</i>Профиль
            </a>
          </li>
          <li className="divider" tabIndex={-1}></li>
          <li>
            <a href="#" className="black-text">
              <i className="material-icons">assignment_return</i>Выйти
            </a>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default NavbarDropdown

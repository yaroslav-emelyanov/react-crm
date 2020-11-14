import React from 'react'
import { NavLink, NavLinkProps, useRouteMatch } from 'react-router-dom'

const SidebarLink = (props: NavLinkProps) => {
  const { activeClassName, ...rest } = props
  const match = useRouteMatch()

  const isActive = props.to === match.path

  return (
    <li className={isActive ? activeClassName : undefined}>
      <NavLink {...rest} />
    </li>
  )
}

export default SidebarLink

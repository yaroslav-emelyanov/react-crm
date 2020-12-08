import React from 'react'
import { AppPaths } from '../../../utils/enums'
import SidebarLink from './SidebarLink'
import { ValueOf } from '../../../utils/interfaces'

interface ISidebarLink {
  label: string
  path: ValueOf<typeof AppPaths>
  exact?: boolean
}

const sidebarLinks: Array<ISidebarLink> = [
  { label: 'Счет', path: AppPaths.home, exact: true },
  { label: 'История', path: AppPaths.history },
  { label: 'Планирование', path: AppPaths.planning },
  { label: 'Новая запись', path: AppPaths.record },
  { label: 'Категории', path: AppPaths.categories },
]

interface Props {
  open: boolean
}

const Sidebar = ({ open }: Props) => {
  const classes = ['sidenav', 'app-sidenav']

  if (open) classes.push('open')

  return (
    <ul className={classes.join(' ')}>
      {sidebarLinks.map((link) => (
        <SidebarLink
          to={link.path}
          exact={link.exact}
          className="waves-effect waves-orange pointer"
          activeClassName="active"
          key={link.path}
        >
          {link.label}
        </SidebarLink>
      ))}
    </ul>
  )
}

export default Sidebar

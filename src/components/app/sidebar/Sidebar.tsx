import React from 'react'
import { AppPaths } from '../../../utils/enums'
import SidebarLink from './SidebarLink'
import { ValueOf } from '../../../utils/interfaces'
import { useTranslation } from 'react-i18next'

interface ISidebarLink {
  label: string
  path: ValueOf<typeof AppPaths>
  exact?: boolean
}

interface Props {
  open: boolean
}

const Sidebar = ({ open }: Props) => {
  const { t } = useTranslation()

  const classes = ['sidenav', 'app-sidenav']

  if (open) classes.push('open')

  const sidebarLinks: Array<ISidebarLink> = [
    { label: t('account.label'), path: AppPaths.home, exact: true },
    { label: t('history.label'), path: AppPaths.history },
    { label: t('planning.label'), path: AppPaths.planning },
    { label: t('record.label'), path: AppPaths.record },
    { label: t('categories.label_plural'), path: AppPaths.categories },
  ]

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

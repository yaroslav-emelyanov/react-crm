import React from 'react'
import Navbar from '../components/app/navbar'
import Sidebar from '../components/app/sidebar'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootState'
import { NavLink } from 'react-router-dom'
import { AppPath } from '../utils/enums'

const MainLayout: React.FC = ({ children }) => {
  const open = useSelector((state: RootState) => state.common.openSidebar)
  const classes = ['app-content']

  if (!open) classes.push('full')

  return (
    <div>
      <div className="app-main-layout">
        <Navbar />
        <Sidebar open={open} />

        <main className={classes.join(' ')}>
          <div className="app-page">{children}</div>
        </main>

        <div className="fixed-action-btn">
          <NavLink className="btn-floating btn-large blue" to={AppPath.record}>
            <i className="large material-icons">add</i>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default MainLayout

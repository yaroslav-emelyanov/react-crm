import React from 'react'
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootState'

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
          <a className="btn-floating btn-large blue" href="/#">
            <i className="large material-icons">add</i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default MainLayout

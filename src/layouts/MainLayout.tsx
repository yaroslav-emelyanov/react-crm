import React from 'react'
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'

const MainLayout: React.FC = ({ children }) => {
  return (
    <div>
      <div className="app-main-layout">
        <Navbar />
        <Sidebar />

        <main className="app-content">
          <div className="app-page">{children}</div>
        </main>

        <div className="fixed-action-btn">
          <a className="btn-floating btn-large blue" href="#">
            <i className="large material-icons">add</i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default MainLayout

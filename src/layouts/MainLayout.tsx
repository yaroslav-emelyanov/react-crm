import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/app/navbar'
import Sidebar from '../components/app/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootState'
import { NavLink } from 'react-router-dom'
import { AppPath } from '../utils/enums'
import { action } from '../store/rootActions'
import Loader from '../components/app/loader/Loader'
import firebase from 'firebase'

const MainLayout: React.FC = ({ children }) => {
  const open = useSelector((state: RootState) => state.common.openSidebar)
  const { name } = useSelector((state: RootState) => state.info)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const classes = ['app-content']

  const getUserInfo = useCallback(async () => {
    setLoading(true)
    await dispatch(action.getUserInfo())
    setLoading(false)
  }, [dispatch, setLoading])

  useEffect(() => {
    const isAuth = firebase.auth().currentUser
    if (isAuth && !name) getUserInfo()
  }, [name, getUserInfo])

  if (!open) classes.push('full')

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="app-main-layout">
          <Navbar />
          <Sidebar open={open} />

          <main className={classes.join(' ')}>
            <div className="app-page">{children}</div>
          </main>

          <div className="fixed-action-btn">
            <NavLink
              className="btn-floating btn-large blue"
              to={AppPath.record}
            >
              <i className="large material-icons">add</i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainLayout

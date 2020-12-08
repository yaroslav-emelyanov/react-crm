import { lazy } from 'react'
import { RouteProps } from './Route'
import { AppPaths } from '../utils/enums'
import { ValueOf } from '../utils/interfaces'

import MainLayout from '../layouts/MainLayout'
import EmptyLayout from '../layouts/EmptyLayout'

interface ExpandedRouteProps extends Omit<RouteProps, 'path'> {
  path: ValueOf<typeof AppPaths>
  protected?: boolean
}

const routes: Array<ExpandedRouteProps> = [
  {
    path: AppPaths.register,
    component: lazy(
      () => import(/* webpackChunkName: "register" */ '../views/Register')
    ),
    layout: EmptyLayout,
  },
  {
    path: AppPaths.login,
    component: lazy(
      () => import(/* webpackChunkName: "login" */ '../views/Login')
    ),
    layout: EmptyLayout,
  },
  {
    path: AppPaths.home,
    component: lazy(
      () => import(/* webpackChunkName: "home" */ '../views/Home')
    ),
    layout: MainLayout,
    exact: true,
    protected: true,
  },
  {
    path: AppPaths.categories,
    component: lazy(
      () => import(/* webpackChunkName: "categories" */ '../views/Categories')
    ),
    layout: MainLayout,
    protected: true,
  },
  {
    path: AppPaths.detailRecord,
    component: lazy(
      () =>
        import(/* webpackChunkName: "detail-record" */ '../views/DetailRecord')
    ),
    layout: MainLayout,
    protected: true,
  },
  {
    path: AppPaths.history,
    component: lazy(
      () => import(/* webpackChunkName: "history" */ '../views/History')
    ),
    layout: MainLayout,
    protected: true,
  },
  {
    path: AppPaths.planning,
    component: lazy(
      () => import(/* webpackChunkName: "planning" */ '../views/Planning')
    ),
    layout: MainLayout,
    protected: true,
  },
  {
    path: AppPaths.profile,
    component: lazy(
      () => import(/* webpackChunkName: "profile" */ '../views/Profile')
    ),
    layout: MainLayout,
  },
  {
    path: AppPaths.record,
    component: lazy(
      () => import(/* webpackChunkName: "record" */ '../views/Record')
    ),
    layout: MainLayout,
    protected: true,
  },
]

export default routes

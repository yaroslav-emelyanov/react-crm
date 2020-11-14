import { lazy } from 'react'
import { RouteProps } from './Route'
import { AppPath } from '../utils/enums'
import { ValueOf } from '../utils/interfaces'

import MainLayout from '../layouts/MainLayout'
import EmptyLayout from '../layouts/EmptyLayout'

interface ExpandedRouteProps extends Omit<RouteProps, 'path'> {
  path: ValueOf<typeof AppPath>
}

const routes: Array<ExpandedRouteProps> = [
  {
    path: AppPath.register,
    component: lazy(
      () => import(/* webpackChunkName: "register" */ '../views/Register')
    ),
    layout: EmptyLayout,
  },
  {
    path: AppPath.login,
    component: lazy(
      () => import(/* webpackChunkName: "login" */ '../views/Login')
    ),
    layout: EmptyLayout,
  },
  {
    path: AppPath.home,
    component: lazy(
      () => import(/* webpackChunkName: "home" */ '../views/Home')
    ),
    layout: MainLayout,
    exact: true,
  },
  {
    path: AppPath.categories,
    component: lazy(
      () => import(/* webpackChunkName: "categories" */ '../views/Categories')
    ),
    layout: MainLayout,
  },
  {
    path: AppPath.detailRecord,
    component: lazy(
      () =>
        import(/* webpackChunkName: "detail-record" */ '../views/DetailRecord')
    ),
    layout: MainLayout,
  },
  {
    path: AppPath.history,
    component: lazy(
      () => import(/* webpackChunkName: "history" */ '../views/History')
    ),
    layout: MainLayout,
  },
  {
    path: AppPath.planning,
    component: lazy(
      () => import(/* webpackChunkName: "planning" */ '../views/Planning')
    ),
    layout: MainLayout,
  },
  {
    path: AppPath.profile,
    component: lazy(
      () => import(/* webpackChunkName: "profile" */ '../views/Profile')
    ),
    layout: MainLayout,
  },
  {
    path: AppPath.record,
    component: lazy(
      () => import(/* webpackChunkName: "record" */ '../views/Record')
    ),
    layout: MainLayout,
  },
]

export default routes

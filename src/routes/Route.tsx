import React, { Suspense } from 'react'
import {
  Route as RouteComponent,
  RouteComponentProps,
  RouteProps as RoutePropsType,
  Redirect,
} from 'react-router-dom'
import firebase from 'firebase'
import { AppPaths } from '../utils/enums'
import Loader from '../components/app/loader/Loader'

export interface RouteProps extends Omit<RoutePropsType, 'component' | 'path'> {
  path: string
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
  layout?: React.ComponentType<any>
  protected?: boolean
}

const DefaultLayout: React.FC = ({ children }) => <>{children}</>

const Route = (props: RouteProps) => {
  const {
    component: Component,
    layout: Layout = DefaultLayout,
    protected: protectedRoute,
    ...rest
  } = props

  const isAuth = firebase.auth().currentUser

  return (
    <RouteComponent
      {...rest}
      render={(props) => (
        <Layout>
          <Suspense fallback={<Loader />}>
            {!protectedRoute ? (
              <Component {...props} />
            ) : isAuth ? (
              <Component {...props} />
            ) : (
              <Redirect to={AppPaths.login + '?message=login'} />
            )}
          </Suspense>
        </Layout>
      )}
    />
  )
}

export default Route

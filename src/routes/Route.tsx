import React, { Suspense } from 'react'
import {
  Route as RouteComponent,
  RouteComponentProps,
  RouteProps as RoutePropsType,
} from 'react-router-dom'

export interface RouteProps extends Omit<RoutePropsType, 'component' | 'path'> {
  path: string
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
  layout?: React.ComponentType<any>
}

const DefaultLayout: React.FC = ({ children }) => <>{children}</>

const Route = (props: RouteProps) => {
  const {
    component: Component,
    layout: Layout = DefaultLayout,
    ...rest
  } = props

  return (
    <RouteComponent
      {...rest}
      render={(props) => (
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
          </Suspense>
        </Layout>
      )}
    />
  )
}

export default Route

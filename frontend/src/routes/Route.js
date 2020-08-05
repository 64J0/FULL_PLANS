import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import Layout from '../pages/Layout';

const Route = ({
  component: Component,
  ...rest
}) => {
  const { loginData } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (!loginData.auth) {
          if (location.pathname !== '/') {
            return (
              <Redirect
                to={{
                  pathname: '/'
                }}
              />
            );
          }

          return <Component />
        }

        if (location.pathname === '/') {
          return (
            <Redirect
              to={{
                pathname: '/home',
                state: { from: location }
              }}
            />
          );
        }

        return (
          <Layout>
            <Component />
          </Layout>
        );
      }}
    />
  )
}

export default Route;
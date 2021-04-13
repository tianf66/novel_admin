import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import storage from '../utils/storage.js';

const renderRoutes = (routes, authPath = '/login', extraProps = {}, switchProps = {}) => routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {

              // 是否认证通过
            let authed = storage.getSession('userInfo')?true:false;
            if (!route.requiresAuth || authed || route.path === authPath) {
              return <route.component {...props} {...extraProps} route={route} />
            }
            return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
          }}
        />
      ))}
    </Switch>
  ) : null
  export default renderRoutes;


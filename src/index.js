import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import * as serviceWorker from './utils/serviceWorker';


/* 路由配置 start */
import renderRoutes from "./router/router.js";
import {BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './router/page.js';
const authPath = '/login' // 默认未登录的时候返回的页面，可以自行设置

ReactDOM.render(
    <Router>
      <Switch>
         {renderRoutes(routes, authPath)}
      </Switch>
   </Router>, document.getElementById('root'));
/* 路由配置 end */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

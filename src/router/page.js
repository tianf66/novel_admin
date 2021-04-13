import LayoutView from "../components/Layout/Layout.js";
import Login from '../components/Login/Login.js';
import {Redirect} from "react-router";
import React from "react";
import DistributorConfig from "../components/Distributor/DistributorConfig";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to={"/login"}/>,
    requiresAuth: false
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    requiresAuth: false
  },
  {
    component: LayoutView,
    routes: [
      {
        path: "/distributorConfig",
        component: DistributorConfig,
        requiresAuth: true
      }
    ]
  },
];

export default routes;

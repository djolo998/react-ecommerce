import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

import adminRoutes from "./adminRoutes";
import basicRoutes from "./basicRoutes";

import ApiErrorBoundary from "../components/ApiErrorBoundary";

const routes = [...basicRoutes, ...adminRoutes];

const createRoutes = (routes) => {
  let data = routes.map((r) => {
    let Component = r.route;
    return (
      <Component
        key={r.path}
        exact
        path={r.path}
        component={r.component}
        layout={r.layout}
      />
    );
  });

  return data;
};

const Routes = () => {
  return (
    <>
      <Router>
        <ApiErrorBoundary />
        <Switch>
          {createRoutes(routes)}
          <Route path="/404" component={NotFoundPage} />
          <Redirect from="/admin" to="/admin/brands" />
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;

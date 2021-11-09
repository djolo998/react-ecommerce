import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

export const ProtectedRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Layout {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export const AuthRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          <Layout {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const AdminRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Layout {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

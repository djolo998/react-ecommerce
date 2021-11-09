import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useImmer } from "use-immer";

import { Typography, Button, Container, Grid } from "@material-ui/core";
import { login } from "../../redux/reducers/authSlice";
import AuthInput from "../../components/AuthInput/AuthInput";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

const LoginPage = () => {
  const dispatch = useDispatch();

  const [loginFormState, setLoginFormState] = useImmer({
    email: "",
    password: "",
  });

  useEffect(() => {
    setLoginFormState((draft) => {
      draft.email = process.env.REACT_APP_LOGIN_FORM_EMAIL_DEFAULT;
      draft.password = process.env.REACT_APP_LOGIN_FORM_PASSWORD_DEFAULT;
    });
  }, []);

  const errors = useSelector((state) => state.auth.errors);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setLoginFormState((draft) => {
      draft[name] = value;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginFormState));
  };

  return (
    <>
      <Container component="main" maxWidth="sm" style={{ marginTop: "30px" }}>
        <div>
          <Typography component="h1" variant="h5">
            <Trans i18nKey={"auth.login.signIn"} />
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <AuthInput
              errors={errors}
              formState={loginFormState}
              label={"Email Address"}
              handleInputChange={handleInputChange}
              name={"email"}
            />
            <AuthInput
              errors={errors}
              formState={loginFormState}
              label={"Password"}
              handleInputChange={handleInputChange}
              name={"password"}
            />

            <Button
              style={{ marginTop: "16px" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              <Trans i18nKey={"auth.login.signIn"} />
            </Button>
            <Grid container>
              <Grid
                item
                style={{
                  marginLeft: "auto",
                  marginTop: "15px",
                }}
              >
                <Link to="/register" variant="body2">
                  <Trans i18nKey={"auth.login.dontHaveAcc"} />
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;

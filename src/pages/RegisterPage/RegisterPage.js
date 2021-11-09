import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useImmer } from "use-immer";

import { Typography, Button, Container, Grid } from "@material-ui/core";
import { register } from "../../redux/reducers/authSlice";
import AuthInput from "../../components/AuthInput/AuthInput";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [registerFormState, setRegisterFormState] = useImmer({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const errors = useSelector((state) => state.auth.errors);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setRegisterFormState((draft) => {
      draft[name] = value;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(registerFormState));
  };
  return (
    <>
      <Container component="main" maxWidth="sm" style={{ marginTop: "30px" }}>
        <div>
          <Typography component="h1" variant="h5">
            <Trans i18nKey={"auth.register.signUp"} />
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <AuthInput
              errors={errors}
              formState={registerFormState}
              label={"First Name"}
              handleInputChange={handleInputChange}
              name={"first_name"}
            />
            <AuthInput
              errors={errors}
              formState={registerFormState}
              label={"Last Name"}
              handleInputChange={handleInputChange}
              name={"last_name"}
            />
            <AuthInput
              errors={errors}
              formState={registerFormState}
              label={"Email Address"}
              handleInputChange={handleInputChange}
              name={"email"}
            />
            <AuthInput
              errors={errors}
              formState={registerFormState}
              label={"Password"}
              handleInputChange={handleInputChange}
              name={"password"}
            />
            <AuthInput
              errors={errors}
              formState={registerFormState}
              label={"Confirm Password"}
              handleInputChange={handleInputChange}
              name={"password_confirmation"}
              type={"password"}
            />

            <Button
              style={{ marginTop: "16px" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              <Trans i18nKey={"auth.register.signUp"} />
            </Button>
            <Grid container>
              <Grid
                item
                style={{
                  marginLeft: "auto",
                  marginTop: "15px",
                }}
              >
                <Link to="/login" variant="body2">
                  <Trans i18nKey={"auth.register.haveAcc"} />
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default RegisterPage;

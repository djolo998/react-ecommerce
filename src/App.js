import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import "./App.css";
import Routes from "./routes";
import { themeCreator } from "./theme";
import variant from "./theme/variant";
import { getTheme } from "./redux/reducers/uiSlice";
import CssBaseline from "@material-ui/core/CssBaseline";
import Helmet from "react-helmet";

import { withTranslation } from "react-i18next";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const theme = useSelector(getTheme);
  const muiTheme = themeCreator(variant[theme]);

  return (
    <>
      <Suspense fallback="loading">
        <>
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          {/* <Helmet title={"React E-commerce"} /> */}
          <MuiThemeProvider theme={muiTheme}>
            <ThemeProvider theme={muiTheme}>
              <CssBaseline />
              <Routes />
            </ThemeProvider>
          </MuiThemeProvider>
        </>
      </Suspense>
    </>
  );
}

export default withTranslation()(App);

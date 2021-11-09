import React, { useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";

import Helmet from "react-helmet";

const AdminCreateHeader = ({ title, text, children }) => {
  return (
    <>
      <Helmet title={title} />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>{text}</Grid>
      </Grid>

      <Grid justify="space-between" container spacing={6} style={{}}>
        <Paper
          style={{
            padding: "30px",
            width: "100%",
          }}
        >
          {children}
        </Paper>
      </Grid>
    </>
  );
};

export default AdminCreateHeader;

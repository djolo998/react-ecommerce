import React from "react";
import styled from "styled-components";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Button,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import StyledLink from "../../../components/StyledLink";

import Helmet from "react-helmet";

const WelcomeText = styled(MuiTypography)`
  font-size: 1.5rem;
`;

const AdminHeader = ({
  welcomeText,
  newResourceLink,
  newResourceEnabled = true,
  newResourceBtnText,
  title,
}) => {
  return (
    <>
      <Helmet title={title} />
      <Grid
        justify="space-between"
        container
        spacing={6}
        style={{ marginTop: "15px" }}
      >
        <Grid item>
          <WelcomeText variant="h3" display="inline">
            {welcomeText}
          </WelcomeText>
        </Grid>

        <Grid item>
          {newResourceEnabled && (
            <StyledLink to={newResourceLink} variant="body2">
              <Button variant="contained" startIcon={<AddIcon />}>
                {newResourceBtnText}
              </Button>
            </StyledLink>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AdminHeader;

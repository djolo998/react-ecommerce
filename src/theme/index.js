import { createTheme } from "@material-ui/core/styles";

export const themeCreator = (variant) => {
  return createTheme({
    ...variant,
  });
};

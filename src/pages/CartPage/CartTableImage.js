import React from "react";
import { Box } from "@material-ui/core";

const CartTableImage = ({ imageUrl }) => {
  let baseUrl = process.env.REACT_APP_IMAGE_URL;
  return (
    <Box>
      <img
        style={{
          width: "100px",
          marginRight: "10px",
        }}
        src={baseUrl + imageUrl}
      />
    </Box>
  );
};

export default CartTableImage;

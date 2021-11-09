import React from "react";
import { Box } from "@material-ui/core";
import Image from "../Image";

const CartTableImage = ({ imageUrl }) => {
  // let baseUrl = process.env.REACT_APP_IMAGE_URL;
  return (
    <Box>
      <Image
        src={imageUrl}
        style={{
          width: "100px",
          marginRight: "10px",
        }}
      />
    </Box>
  );
};

export default CartTableImage;

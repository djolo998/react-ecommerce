import React from "react";

const Image = ({ src, style, ...props }) => {
  let baseUrl = process.env.REACT_APP_IMAGE_URL;
  return <img style={{ ...style }} src={baseUrl + src} {...props} />;
};

export default Image;

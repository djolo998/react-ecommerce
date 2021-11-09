import React from "react";

const ResourceForm = ({ children, method = "post", handleSubmit }) => {
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      method={method}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </form>
  );
};

export default ResourceForm;

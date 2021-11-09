import React from "react";

const DisplayFieldErrors = ({ field }) => {
  return (
    <>
      {field &&
        field.map((e) => {
          return <div style={{ color: "red" }}>{e}</div>;
        })}
    </>
  );
};

export default DisplayFieldErrors;

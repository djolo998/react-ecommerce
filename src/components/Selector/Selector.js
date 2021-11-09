import React from "react";
import { spacing, flexbox } from "@material-ui/system";
import styled from "styled-components";
import {
  Grid,
  Paper as MuiPaper,
  Typography as MuiTypography,
} from "@material-ui/core/";
const SizeWrapper = styled(MuiPaper)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border: 1px solid #556ee6;
  }
`;
const SizeCard = ({ value, selected, handleClick }) => {
  const backgroundColor = selected ? "" : "";
  const selectedStyle = selected ? { border: "2px solid #3167eb" } : {};
  return (
    <SizeWrapper
      onClick={handleClick}
      elevation={3}
      style={{
        ...selectedStyle,
        width: "40px",
        height: "30px",
        padding: "20px",
        backgroundColor,
        marginRight: "20px",
        marginBottom: "20px",
      }}
    >
      <span>{value}</span>
    </SizeWrapper>
  );
};
const Selector = ({ sizes, selectedSize, handleSelectedSize }) => {
  return (
    <Grid container style={{ width: "80%", marginLeft: "15px" }}>
      {sizes.map((size) => {
        const isSelected = selectedSize == size.size_id;
        return (
          <SizeCard
            key={size.size_id}
            value={size.size_value}
            selected={isSelected}
            handleClick={() => handleSelectedSize(size.size_id)}
          />
        );
      })}
    </Grid>
  );
};

export default Selector;

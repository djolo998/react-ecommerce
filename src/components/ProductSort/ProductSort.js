import React from "react";
import { Typography, Select, MenuItem } from "@material-ui/core";
import { Trans } from "react-i18next";

const ProductSort = ({
  selectedSortState,
  handleSortByChange,
  sortState,
  total,
  isProductsLoaded,
}) => {
  return (
    <div
      style={{
        display: "flex",
        height: "55px",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      {isProductsLoaded && (
        <>
          <Typography component="span">
            {total} <Trans i18nKey={"products.itemsFound"} />
          </Typography>

          <Select
            style={{
              display: "flex",
              width: "180px",
            }}
            value={selectedSortState}
            onChange={(e) => handleSortByChange(e)}
          >
            {sortState.map((item, ind) => {
              let key = "products." + item.translationKey;
              return (
                <MenuItem value={ind} key={key}>
                  <Trans i18nKey={key} />
                </MenuItem>
              );
            })}
          </Select>
        </>
      )}
    </div>
  );
};

export default ProductSort;

import React from "react";

import MiniProductCard from "../MiniProductCard";
import MiniProductCardSkeleton from "../MiniProductCardSkeleton";

import { Paper, Grid } from "@material-ui/core";

const ProductsContainer = ({ products, isProductsLoaded }) => {
  return (
    <Paper style={{ padding: "20px", borderRadius: "0px", minHeight: "80vh" }}>
      <Grid
        container
        spacing={3}
        alignContent="space-between"
        style={{ width: "inherit" }}
      >
        {isProductsLoaded &&
          products.map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={product.product_id}>
                <MiniProductCard {...product} />
              </Grid>
            );
          })}
        {!isProductsLoaded &&
          Array(12)
            .fill(null)
            .map((x, ind) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={ind}>
                  <MiniProductCardSkeleton />
                </Grid>
              );
            })}
      </Grid>
    </Paper>
  );
};
export default ProductsContainer;

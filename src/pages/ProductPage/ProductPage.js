import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import {
  Paper,
  Grid,
  Typography as MuiTypography,
  Breadcrumbs as MuiBreadcrumbs,
  Container,
} from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import InputLabel from "@material-ui/core/InputLabel";

import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import Selector from "../../components/Selector";
import Image from "../../components/Image";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { fetchProduct, getProduct } from "../../redux/reducers/productsSlice";
import { fetchAddToCart } from "../../redux/reducers/cartSlice";
import { useAddToCart } from "../../hooks";

const MiniImage = styled(Image)`
  margin: 5px;
  width: 50px;
  height: 35px;
  object-fit: "contain";
  cursor: pointer;
  &:hover {
    border: 1px solid #556ee6;
  }
`;

const MiniProductImages = ({ images, onClick }) => {
  return (
    <Paper>
      {images.map((image) => {
        return (
          <MiniImage
            key={image.image_id}
            src={image.image_url}
            onClick={() => onClick(image.image_url)}
          />
        );
      })}
    </Paper>
  );
};

function ProductPage({ match }) {
  const dispatch = useDispatch();
  let { productId } = match.params;

  const product = useSelector((state) => getProduct(state, productId));

  const {
    selectedQuantity,
    maxQuantityForSize,
    selectedSize,
    handleSelectedSize,
    handleAddToCart,
    handleSelectedQuantity,
  } = useAddToCart(product);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  useEffect(() => {
    if (product) {
      setCoverImage(product.image);
      setPageTitle(`${product.brand.brand_name} - ${product.product_name}`);
    }
  }, [product]);

  const { t } = useTranslation();

  const [coverImage, setCoverImage] = useState(null);

  const [pageTitle, setPageTitle] = useState("Product page");

  const handleCoverImageChanges = (image) => setCoverImage(image);

  return (
    <>
      <Container maxWidth="lg" fluid>
        <div>
          {product && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box
                  boxShadow={0}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      width: "80%",
                      height: "500px",
                      objectFit: "contain",
                    }}
                    src={coverImage}
                  />
                </Box>
                <Box
                  boxShadow={0}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MiniProductImages
                    images={product.images}
                    onClick={handleCoverImageChanges}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} style={{ padding: "20px" }}>
                <Box boxShadow={0}>
                  <Typography
                    variant="h4"
                    component="h4"
                    style={{ marginLeft: "15px" }}
                  >
                    {product.product_name}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    style={{ margin: "15px" }}
                  >
                    <Rating
                      name="read-only"
                      value={Number(product.reviews_rating)}
                      precision={0.1}
                      readOnly
                    />
                    <span style={{ marginLeft: "5px" }}>
                      {product.reviews_count} {t("product.reviews")}
                    </span>
                  </Box>
                  <Typography
                    component="p"
                    style={{
                      margin: "15px",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    ${product.product_price}
                  </Typography>
                  <Typography component="p" style={{ margin: "15px" }}>
                    {product.product_description}
                  </Typography>
                  <Divider />
                  <Box
                    display="flex"
                    alignItems="center"
                    style={{ margin: "15px" }}
                  >
                    <InputLabel style={{ marginRight: "10px" }}>
                      {t("product.quantity")}
                    </InputLabel>
                    <Select
                      value={selectedQuantity}
                      onChange={handleSelectedQuantity}
                    >
                      {Array.from(
                        { length: maxQuantityForSize },
                        (_, i) => i + 1
                      ).map((qty, ind) => {
                        return (
                          <MenuItem value={qty} key={ind}>
                            {qty}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Box
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      <Button
                        disabled={!selectedSize}
                        size="small"
                        variant="contained"
                        color="primary"
                        endIcon={<ShoppingCartIcon />}
                        onClick={handleAddToCart}
                      >
                        {t("cart.addTo")}
                      </Button>
                    </Box>
                  </Box>
                  <Box>
                    <p style={{ marginLeft: "15px", color: "#969696" }}>
                      {t("product.availableSizes")}
                    </p>
                    <Selector
                      sizes={product.sizes}
                      selectedSize={selectedSize}
                      handleSelectedSize={handleSelectedSize}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </div>
      </Container>
    </>
  );
}

export default ProductPage;

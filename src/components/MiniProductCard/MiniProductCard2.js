import React from "react";
import styled from "styled-components";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Image from "../Image";
import { Rating } from "@material-ui/lab";

const ProductNameText = styled(Typography)`
  padding: ${(props) => props.theme.spacing(1)}px;
  color: ${(props) => props.theme.miniProduct.textColor};
`;
const ProductNewPrice = styled.b`
  color: ${(props) => props.theme.miniProduct.newPriceColor};
`;
const ProductOldPrice = styled.del`
  color: ${(props) => props.theme.miniProduct.oldPriceColor};
  margin-right: 10px;
`;

const NewBadge = styled.span`
  font-size: 10px;
  padding: 4px;
  background: ${(props) => props.theme.miniProduct.newBadgeBackgroundColor};
  color: white;
  width: fit-content;
  border-radius: 4px;
`;

const Card = styled(MuiCard)`
  height: 100%;
`;
const CardContent = styled(MuiCardContent)`
  padding: 8px;
  padding-bottom: 8px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const MiniProductCard = ({
  product_id,
  product_name,
  image,
  product_price,
  product_old_price,
  is_new,
  on_sale,
  reviews_rating,
}) => {
  const { t } = useTranslation();

  let hasAnyBadge = on_sale || is_new;

  return (
    <Card>
      <CardContent>
        <Box style={{ display: "flex", gap: "10px" }}>
          {!!on_sale && <NewBadge>{t("products.sale")}</NewBadge>}
          {!!is_new && <NewBadge>{t("products.new")}</NewBadge>}
        </Box>

        <Box style={{ marginTop: hasAnyBadge ? "0px" : "22px" }}>
          <Image
            src={image}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <ProductNameText align="center" variant="h6">
          <Link
            to={`/products/${product_id}`}
            variant="body2"
            style={{
              color: "inherit",
              textDecoration: "none",
              fontSize: "18px",
            }}
          >
            {product_name}{" "}
          </Link>
        </ProductNameText>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ marginTop: "auto" }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "column",
            }}
          >
            <Rating
              value={reviews_rating}
              precision={0.1}
              readOnly={true}
              style={{ fontSize: "18px" }}
            />
            <Typography
              color="textSecondary"
              align="center"
              style={{ padding: "5px", marginTop: "auto" }}
            >
              {!!on_sale && (
                <ProductOldPrice>${product_old_price}</ProductOldPrice>
              )}

              <ProductNewPrice>${product_price}</ProductNewPrice>
            </Typography>
          </Box>

          {/* <Button color="primary">{t("products.detailsBtn")}</Button> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MiniProductCard;

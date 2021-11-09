import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  withStyles,
} from "@material-ui/core";

import { useTranslation } from "react-i18next";

const PriceSlider = ({
  priceSliderState,
  handleSlider,
  handleChangeAccordion,
  expanded,
  productMinPrice,
  productMaxPrice,
  showSlider,
}) => {
  const { t } = useTranslation();
  const formatValue = (value) => `$${value.toFixed(2)}`;

  const marks = [
    {
      value: productMaxPrice,
      label: formatValue(productMaxPrice),
    },

    {
      value: productMinPrice,
      label: formatValue(productMinPrice),
    },
  ];

  return (
    <Accordion onChange={() => handleChangeAccordion("price")}>
      <AccordionSummary>
        <Typography>{t("products.price")}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: "100%", padding: "20px" }}>
          <div>
            {showSlider && (
              <Slider
                valueLabelFormat={(value) => formatValue(value)}
                min={productMinPrice}
                max={productMaxPrice}
                value={priceSliderState}
                onChange={handleSlider}
                valueLabelDisplay="on"
                marks={marks}
              />
            )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default PriceSlider;

import React from "react";
import {
  Typography as MuiTypography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { capitalizeFirstLetter } from "../../utils";
import { useTranslation } from "react-i18next";

const ProductFilterAccordion = ({
  itemsData,
  checkedData,
  handleCBChange,
  accordionState,
  handleChangeAccordion,
  expanded,
  itemIdKey,
  itemLabelKey,
  pfsKey,
}) => {
  const { t } = useTranslation();
  const translationKey = `products.${pfsKey}`;
  let text = capitalizeFirstLetter(pfsKey);
  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={() => handleChangeAccordion(pfsKey)}
      >
        <AccordionSummary>
          <MuiTypography variant="h6">{t(translationKey)}</MuiTypography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              {t("products.choose")} {t(translationKey)}
            </FormLabel>
            <FormGroup>
              {/* <div> */}
              {itemsData.length > 0 &&
                itemsData.map((x) => {
                  return (
                    <FormControlLabel
                      key={x[itemIdKey]}
                      control={
                        <Checkbox
                          checked={checkedData.includes(x[itemIdKey])}
                          onChange={handleCBChange}
                          name={pfsKey}
                          value={x[itemIdKey]}
                          color={"primary"}
                        />
                      }
                      label={x[itemLabelKey]}
                    />
                  );
                })}
              {/* </div> */}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProductFilterAccordion;

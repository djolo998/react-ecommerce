import React from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core/";

import i18n from "../../i18n";
import { Trans } from "react-i18next";

const SelectLanguage = () => {
  const languageSelected = i18n.language;

  let languages = [
    { iconKey: "rs", i18nKey: "serbian", i18nId: "sr" },
    { iconKey: "us", i18nKey: "english", i18nId: "en" },
  ];

  const handleChange = (e) => {
    const { value } = e.target;
    i18n.changeLanguage(value);
  };

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="select-language" style={{ fontSize: "14px" }}>
          <Trans i18nKey={"settings.chooseLanguage"} />
        </InputLabel>
        <Select value={languageSelected} onChange={handleChange}>
          {languages.map((l) => {
            let iconClass = `flag-icon flag-icon-${l.iconKey}`;
            return (
              <MenuItem value={l.i18nId} key={l.i18nId}>
                <div
                  className={iconClass}
                  style={{ marginRight: "10px" }}
                ></div>
                {l.i18nKey}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectLanguage;

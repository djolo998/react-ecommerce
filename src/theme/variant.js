const lightVariant = {
  spacing: 8,
  palette: {
    primary: {
      main: "#007bff",
    },
  },
  status: {
    color: {
      Paid: "#34c38f",
      Refund: "#f1b44c",
      pending: "#f1b44c",
    },
  },
  miniProduct: {
    textColor: "#343a40",
    newPriceColor: "#495057",
    newPriceColor: "#495057",
    oldPriceColor: "#74788d",
    newBadgeBackgroundColor: "#fa3434",
  },
};

const darkVariant = {
  spacing: 8,
  palette: {
    type: "dark",
    // primary: {
    //   main: "#007bff",
    // },
  },
  status: {
    color: {
      Paid: "#34c38f",
      Refund: "#f1b44c",
      pending: "#f1b44c",
    },
  },
  miniProduct: {
    textColor: "#fff",
    newPriceColor: "#fff",
    // newPriceColor: "#495057",
    oldPriceColor: "#74788d",
    newBadgeBackgroundColor: "#fa3434",
  },
};

const variants = {
  light: lightVariant,
  dark: darkVariant,
};

export default variants;

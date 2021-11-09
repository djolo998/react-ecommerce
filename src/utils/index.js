import queryString from "query-string";

export const formatValue = (value) => `$${value.toFixed(2)}`;

export const formatPrice = (price) =>
  Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getQueryString = (search) => {
  if (!search) search = "?page=1";
  if (!search.includes("page=")) search += "&page=1";
  return search;
};

export const makeQuery = (productFilterState) => {
  let allowedProps = ["brands", "colors", "categories", "sizes"];
  let obj = allowedProps.reduce((acc, cv) => {
    acc[cv] = productFilterState[cv].checked;
    return acc;
  }, {});

  return obj;
};

export const convertQueryStringToObj = (search) => {
  return queryString.parse(search, {
    arrayFormat: "bracket",
    parseNumbers: true,
  });
};

export const makeQuerySearchDraft = (search) => (draft) => {
  let allowedProps = ["brands", "colors", "categories", "sizes"];

  let query = queryString.parse(search, {
    arrayFormat: "bracket",
    parseNumbers: true,
  });

  allowedProps.forEach((p) => {
    draft[p].checked = query[p] ? query[p].map(Number) : [];
  });
};

export const checkBoxChangeDraft = (filterName, name) => (draft) => {
  let index = draft[filterName].checked.indexOf(Number(name));
  if (index > -1) draft[filterName].checked.splice(index, 1);
  else draft[filterName].checked.push(Number(name));
};

export const getFilterQuery = ({
  productFilterState,
  sortState,
  selectedSortState,
  page = 1,
  extra = {},
}) => {
  let filters = makeQuery(productFilterState);
  let query = queryString.stringify(
    {
      ...filters,
      orderBy: sortState[selectedSortState].orderBy,
      sortBy: sortState[selectedSortState].sortBy,
      page: page,
      ...extra,
    },
    { arrayFormat: "bracket" }
  );
  return query;
};

export const createProductSizeQuantyMap = (cart) =>
  cart.reduce((acc, item) => {
    let { product_id, product, size_id, quantity, cart_id } = item;
    let sizes = product.sizes.reduce((acc, cv) => {
      return { ...acc, [cv.size_id]: cv };
    }, {});
    let productPriceNumber = Number(product.product_price);
    return {
      ...acc,
      [cart_id]: {
        product_id: product_id,
        sizes: sizes,
        selectedSizeId: size_id,
        selectedQuantity: quantity,
        productPrice: productPriceNumber,
        productPriceString: formatValue(productPriceNumber),
      },
    };
  }, {});

import { formatPrice } from "../../../utils";
import ProductTableActions from "../components/ProductTableActions";

const createProductFormInputs = ({ brands, colors, genres, categories }) => {
  return [
    { name: "product_name", type: "text", label: "Product Name" },
    { name: "product_description", type: "text", label: "Product Description" },
    { name: "product_price", type: "number", label: "Product Price" },
    {
      name: "brand_id",
      type: "select",
      label: "Brands",
      elementValueKey: "brand_name",
      arrayData: brands,
    },
    {
      name: "color_id",
      type: "select",
      label: "Colors",
      elementValueKey: "color_value",
      arrayData: colors,
    },
    {
      name: "genre_id",
      type: "select",
      label: "Genres",
      elementValueKey: "genre_name",
      arrayData: genres,
    },
  ];
};

const productDefaultState = {
  product_name: null,
  product_description: null,
  product_price: null,
  brand_id: null,
  color_id: null,
  genre_id: null,
  sizes_id: [],
  categories_id: [],
  image: null,
};

const updateDraftState = (updatedObject, keyMapToUpdate) => (draft) => {
  Object.keys(keyMapToUpdate).forEach((key) => {
    draft[key] = updatedObject[keyMapToUpdate[key]];
  });
};
const createChangeObject = (productStateKeyMap, state) => {
  let data = Object.keys(productStateKeyMap).reduce((acc, key) => {
    acc[productStateKeyMap[key]] = state[key];
    return acc;
  }, {});
  return { ...data, ...state };
};
const productStateKeyMap = {
  brand_id: "brand",
  color_id: "color",
  genre_id: "genre",
  categories_id: "categories",
  sizes_id: "sizes",
  product_name: "product_name",
  product_description: "product_description",
  product_price: "product_price",
  image: "image",
};

export const productTableDate = [
  { title: "Product Id", key: "product_id" },
  { title: "Product Name", key: "product_name" },
  { title: "Product Description", key: "product_description" },
  {
    title: "Product Price",
    key: "product_price",
    custom: true,
    fn: formatPrice,
  },
  { title: "Brand Name", key: "brand.brand_name" },
  { title: "Color", key: "color.color_value" },
  { title: "Genre", key: "genre.genre_name" },
  { title: "Actions", key: "actions", component: ProductTableActions },
];

export {
  createProductFormInputs,
  productDefaultState,
  updateDraftState,
  createChangeObject,
  productStateKeyMap,
};

import { normalize, denormalize, schema } from "normalizr";

const status = new schema.Entity("status");
const userSchema = new schema.Entity("users", {}, { idAttribute: "user_id" });
const productsSchema = new schema.Entity(
  "products",
  {},
  { idAttribute: "product_id" }
);
const orderDetails = new schema.Entity(
  "details",
  { product: productsSchema },
  { idAttribute: "op_id" }
);
const order = new schema.Entity("orders", {
  status: status,
  user: userSchema,
  details: [orderDetails],
});

export const normalizeOrders = (ordersData) => normalize(ordersData, [order]);

export const denormalizeOrders = (ids, entities) => {
  return denormalize({ orders: ids }, { orders: [order] }, entities);
};

const brandSchema = new schema.Entity(
  "brands",
  {},
  { idAttribute: "brand_id" }
);
const colorSchema = new schema.Entity(
  "colors",
  {},
  { idAttribute: "color_id" }
);
const genreSchema = new schema.Entity(
  "genres",
  {},
  { idAttribute: "genre_id" }
);
const categorySchema = new schema.Entity(
  "categories",
  {},
  {
    idAttribute: "category_id",
  }
);
const sizeSchema = new schema.Entity("sizes", {}, { idAttribute: "size_id" });

const product = new schema.Entity(
  "products",
  {
    brand: brandSchema,
    color: colorSchema,
    genre: genreSchema,
    categories: [categorySchema],
    sizes: [sizeSchema],
  },
  {
    idAttribute: "product_id",
  }
);

export const denormalizeProducts = (ids, entities) => {
  return denormalize({ products: ids }, { products: [product] }, entities);
};
export const denormalizeCategories = (ids, entities) => {
  return denormalize(
    { categories: ids },
    { categories: [categorySchema] },
    entities
  );
};

export const denormalizeBrands = (ids, entities) => {
  return denormalize({ brands: ids }, { brands: [brandSchema] }, entities);
};
export const denormalizeColors = (ids, entities) => {
  return denormalize({ colors: ids }, { colors: [colorSchema] }, entities);
};

export const normalizeCategories = (data) => normalize(data, [categorySchema]);
export const normalizeCategory = (data) => normalize(data, categorySchema);

export const normalizeBrands = (data) => normalize(data, [brandSchema]);
export const normalizeBrand = (data) => normalize(data, brandSchema);

export const normalizeColors = (data) => normalize(data, [colorSchema]);
export const normalizeColor = (data) => normalize(data, colorSchema);

export const normalizeProducts = (productData) =>
  normalize(productData, [product]);

export const normalizeProduct = (productData) =>
  normalize(productData, product);

export const normalizeUsers = (data) => normalize(data, [userSchema]);
export const denormalizeUsers = (ids, entities) => {
  return denormalize({ users: ids }, { users: [userSchema] }, entities);
};

import {
  createSelector,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

export const colorsAdapter = createEntityAdapter({
  selectId: (color) => color.color_id,
});
export const categoriesAdapter = createEntityAdapter({
  selectId: (categories) => categories.category_id,
});
export const brandsAdapter = createEntityAdapter({
  selectId: (brand) => brand.brand_id,
});
export const productsAdapter = createEntityAdapter({
  selectId: (product) => product.product_id,
});

export const genresAdapter = createEntityAdapter({
  selectId: (genre) => genre.genre_id,
});
export const sizesAdapter = createEntityAdapter({
  selectId: (size) => size.size_id,
});
export const ordersAdapter = createEntityAdapter({
  selectId: (order) => order.id,
});
export const statusAdapter = createEntityAdapter({
  selectId: (status) => status.id,
});
export const usersAdapter = createEntityAdapter({
  selectId: (user) => user.user_id,
});

export const { selectAll: selectCategoriesAll } =
  categoriesAdapter.getSelectors((state) => state.admin.categories);

export const { selectAll: selectBrandsAll } = brandsAdapter.getSelectors(
  (state) => state.admin.brands
);
export const { selectAll: selectColorsAll } = colorsAdapter.getSelectors(
  (state) => state.admin.colors
);
export const { selectAll: selectGenresAll } = genresAdapter.getSelectors(
  (state) => state.admin.genres
);
export const { selectAll: selectSizesAll } = sizesAdapter.getSelectors(
  (state) => state.admin.sizes
);

export const selectAllResources = createSelector(
  [
    selectBrandsAll,
    selectColorsAll,
    selectGenresAll,
    selectSizesAll,
    selectCategoriesAll,
  ],
  (brands, colors, genres, sizes, categories) => {
    return { brands, colors, genres, sizes, categories };
  }
);

export const selectIsFetched = createSelector(
  [
    (state) => state.admin.brands.queryString,
    (state) => state.admin.colors.queryString,
    (state) => state.admin.genres.queryString,
    (state) => state.admin.sizes.queryString,
    (state) => state.admin.categories.queryString,
  ],
  (brands, colors, genres, sizes, categories) => {
    return { brands, colors, genres, sizes, categories };
  }
);

export const adapterEntities = {
  colors: colorsAdapter,
  categories: categoriesAdapter,
  brands: brandsAdapter,
  products: productsAdapter,
  genres: genresAdapter,
  sizes: sizesAdapter,
  orders: ordersAdapter,
  status: statusAdapter,
  users: usersAdapter,
};

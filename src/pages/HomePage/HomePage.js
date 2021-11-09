import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Grid, Paper } from "@material-ui/core";
import { useImmer } from "use-immer";
import {
  getQueryString,
  makeQuerySearchDraft,
  checkBoxChangeDraft,
  convertQueryStringToObj,
  getFilterQuery,
} from "../../utils";

import { fetchBrands } from "../../redux/reducers/brandSlice";
import { fetchColors } from "../../redux/reducers/colorSlice";
import { fetchProducts, getProducts } from "../../redux/reducers/productsSlice";

import ProductFilterAccordion from "../../components/ProductFilterAccordion";
import ProductSort from "../../components/ProductSort";
import ProductsContainer from "../../components/ProductsContainer";
import Pagination from "../../components/Pagination";
import PriceSlider from "../../components/PriceSlider";

import { fetchCategories } from "../../redux/reducers/categorySlice";
import { fetchSizes } from "../../redux/reducers/sizeSlice";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const querySearch = getQueryString(props.history.location.search);
  const locationPathName = props.history.location.pathname;

  const sortState = [
    {
      translationKey: "choose",
    },
    {
      orderBy: "asc",
      sortBy: "product_price",
      name: "Price: Low to High",
      translationKey: "priceDescending",
    },
    {
      orderBy: "desc",
      sortBy: "product_price",
      name: "Price: High to Low",
      translationKey: "priceAscending",
    },
    {
      orderBy: "asc",
      sortBy: "product_name",
      name: "Name: A to Z",
      translationKey: "nameAscending",
    },
    {
      orderBy: "desc",
      sortBy: "product_name",
      name: "Name: Z to A",
      translationKey: "nameDescending",
    },
  ];

  const [accordionState, setAccordionState] = useImmer({
    brands: false,
    sizes: false,
    price: false,
    colors: false,
  });

  const [selectedSortState, setSelectedSortState] = useState(0);

  const {
    products,
    last_page,
    current_page,
    total,
    productMinPrice,
    productMaxPrice,
    showSlider,
  } = useSelector((state) => getProducts(state, querySearch));

  const isProductsLoaded = !!products.length;

  const [priceSliderState, setPriceSliderState] = useState(null);

  const [showSliderState, setShowSliderState] = useState(false);

  const brands = useSelector((state) => state.brands.items);
  const colors = useSelector((state) => state.colors.items);
  const categories = useSelector((state) => state.categories.items);
  const sizes = useSelector((state) => state.sizes.items);

  const isProductsInStore = useSelector(
    (state) => state.products.items[querySearch]
  );

  const handleChangePage = (e, page) => {
    let min_price = priceSliderState[0];
    let max_price = priceSliderState[1];

    let extra = { min_price, max_price };

    let query = getFilterQuery({
      productFilterState,
      sortState,
      selectedSortState,
      page,
      extra,
    });
    props.history.push(`${locationPathName}?${query}`);
  };

  const paginationProps = {
    last_page,
    current_page,
    handleChangePage,
  };
  let cbFilterInitialState = {
    items: [],
    checked: [],
  };

  const initialProductFilterState = {
    brands: cbFilterInitialState,
    colors: cbFilterInitialState,
    categories: cbFilterInitialState,
    sizes: cbFilterInitialState,
  };

  const [productFilterState, setProductFilterState] = useImmer(
    initialProductFilterState
  );

  useEffect(() => {
    if (priceSliderState == null && productMaxPrice > 0) {
      setPriceSliderState([productMinPrice, productMaxPrice]);
    }
    if (
      priceSliderState &&
      productMaxPrice > 0 &&
      productMaxPrice < priceSliderState[1]
    ) {
      setPriceSliderState([priceSliderState[0], productMaxPrice]);
    }
  }, [productMinPrice, productMaxPrice]);

  //Effects
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchColors());
    dispatch(fetchCategories());
    dispatch(fetchSizes());

    dispatch(fetchProducts(querySearch));
    if (window.location.search) {
      let draftFunction = makeQuerySearchDraft(querySearch);
      setProductFilterState(draftFunction);
    }

    let queryRes = convertQueryStringToObj(querySearch);
    let sortStateIndex = sortState.findIndex((x) => {
      return x.sortBy == queryRes.sortBy && x.orderBy == queryRes.orderBy;
    });

    if (sortStateIndex == -1) {
      setSelectedSortState(0);
    } else {
      setSelectedSortState(sortStateIndex);
    }
  }, []);

  useEffect(() => {
    if (!isProductsInStore) {
      dispatch(fetchProducts(querySearch));
    }
  }, [querySearch]);

  //

  const handleChangeAccordion = (name) => {
    setAccordionState((draft) => {
      draft[name] = !draft[name];
    });
  };

  const handleSortByChange = (e) => setSelectedSortState(e.target.value);

  const handleCBChange = (event) => {
    let value = event.target.value;
    let filterName = event.target.name;
    let draftFunction = checkBoxChangeDraft(filterName, value);
    setProductFilterState(draftFunction);
  };

  const handleFilters = () => {
    let min_price = priceSliderState[0];
    let max_price = priceSliderState[1];
    let extra = { min_price, max_price };

    let query = getFilterQuery({
      productFilterState,
      sortState,
      selectedSortState,
      page: 1,
      extra,
    });

    props.history.push(`${locationPathName}?${query}`);
  };

  const handleSlider = (e, newValue) => {
    setPriceSliderState(newValue);
  };

  return (
    <div>
      <Container maxWidth="lg" fluid style={{ marginTop: "10px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper>
              <ProductFilterAccordion
                itemsData={brands}
                checkedData={productFilterState.brands.checked}
                handleCBChange={handleCBChange}
                expanded={accordionState["brands"]}
                handleChangeAccordion={handleChangeAccordion}
                itemIdKey={"brand_id"}
                itemLabelKey={"brand_name"}
                pfsKey={"brands"}
              />
              <ProductFilterAccordion
                itemsData={colors}
                checkedData={productFilterState.colors.checked}
                handleCBChange={handleCBChange}
                expanded={accordionState["colors"]}
                handleChangeAccordion={handleChangeAccordion}
                itemIdKey={"color_id"}
                itemLabelKey={"color_value"}
                pfsKey={"colors"}
              />
              <ProductFilterAccordion
                itemsData={categories}
                checkedData={productFilterState.categories.checked}
                handleCBChange={handleCBChange}
                expanded={accordionState["categories"]}
                handleChangeAccordion={handleChangeAccordion}
                itemIdKey={"category_id"}
                itemLabelKey={"category_name"}
                pfsKey={"categories"}
              />
              <ProductFilterAccordion
                itemsData={sizes}
                checkedData={productFilterState.sizes.checked}
                handleCBChange={handleCBChange}
                expanded={accordionState["sizes"]}
                handleChangeAccordion={handleChangeAccordion}
                itemIdKey={"size_id"}
                itemLabelKey={"size_value"}
                pfsKey={"sizes"}
              />
              <PriceSlider
                priceSliderState={priceSliderState}
                handleSlider={handleSlider}
                handleChangeAccordion={handleChangeAccordion}
                productMinPrice={productMinPrice}
                productMaxPrice={productMaxPrice}
                showSlider={showSlider}
              />
              <Button
                style={{ height: "48px" }}
                size="small"
                color="primary"
                disabled={false}
                onClick={handleFilters}
              >
                Filter
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper>
              <ProductSort
                selectedSortState={selectedSortState}
                handleSortByChange={handleSortByChange}
                sortState={sortState}
                total={total}
                isProductsLoaded={isProductsLoaded}
              />
              <ProductsContainer
                products={products}
                isProductsLoaded={isProductsLoaded}
              />
              <Pagination {...paginationProps} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;

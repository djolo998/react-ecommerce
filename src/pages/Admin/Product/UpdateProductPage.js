import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "@material-ui/core";

import {
  selectProductsUpdateErrors,
  updateProduct,
  fetchProduct,
  selectProductById,
} from "../../../redux/reducers/AdminSlice/productsSlice";

import { selectAllResources } from "../../../redux/reducers/AdminSlice/adapter";

import { CreateFormElements, CustomCheckBox } from "../Form";

import {
  AddResourceButton,
  AdminCreateHeader,
  ResourceForm,
} from "../components/";
import {
  createProductFormInputs,
  productDefaultState,
  updateDraftState,
  createChangeObject,
  productStateKeyMap,
} from "./shared";
import { useProducts, useDispatchResources } from "./hooks";

function UpdateProductPage({ match }) {
  const dispatch = useDispatch();
  let { productId } = match.params;

  const [pageTitle, setPageTitle] = useState("Admin - Update Product");

  const productInStore = useSelector((state) =>
    selectProductById(state, productId)
  );

  useEffect(() => {
    if (productInStore) {
      setProductState(updateProductState);
      setPageTitle(`Update - ${productInStore.product_name}`);
    } else {
      dispatch(fetchProduct(productId));
    }
  }, [productInStore]);

  const { brands, colors, genres, sizes, categories } =
    useSelector(selectAllResources);

  let formInputs = createProductFormInputs({ brands, colors, genres });

  const {
    productState,
    setProductState,
    handleCheckBoxStateChanged,
    handleProductFieldChange,
    handleFileChange,
  } = useProducts(productDefaultState);

  const { fetchAll } = useDispatchResources();

  useEffect(() => {
    fetchAll();
  }, []);

  const updateProductState = updateDraftState(
    productInStore,
    productStateKeyMap
  );

  let productStateErrors = useSelector(selectProductsUpdateErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = createChangeObject(productStateKeyMap, {
      ...productState,
      id: productId,
    });
    dispatch(updateProduct(data));
  };

  return (
    <AdminCreateHeader title={pageTitle} text="Update Product">
      {productInStore && (
        <ResourceForm handleSubmit={handleSubmit}>
          <CreateFormElements
            formInputs={formInputs}
            formState={productState}
            formErrorState={productStateErrors}
            handleFieldChange={handleProductFieldChange}
          />
          <div>
            <CustomCheckBox
              input={{
                name: "sizes_id",
                value: "size_id",
                label: "Sizes",
                elementValueKey: "size_value",
              }}
              formState={productState}
              formErrorState={productStateErrors}
              handleChange={handleCheckBoxStateChanged}
              arrayData={sizes}
            />
          </div>
          <div>
            <Input
              style={{ marginTop: "25px", marginBottom: "25px" }}
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <CustomCheckBox
              input={{
                name: "categories_id",
                value: "category_id",
                label: "Categories",
                elementValueKey: "category_name",
              }}
              formState={productState}
              formErrorState={productStateErrors}
              handleChange={handleCheckBoxStateChanged}
              arrayData={categories}
            />
          </div>

          <div>
            <AddResourceButton text="Update product" />
          </div>
        </ResourceForm>
      )}
    </AdminCreateHeader>
  );
}

export default UpdateProductPage;

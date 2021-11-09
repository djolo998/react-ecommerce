import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@material-ui/core";

import {
  selectProductsErrors,
  addNewProduct,
} from "../../../redux/reducers/AdminSlice/productsSlice";

import { selectAllResources } from "../../../redux/reducers/AdminSlice/adapter";

import { CreateFormElements, CustomCheckBox } from "../Form";

import {
  AddResourceButton,
  AdminCreateHeader,
  ResourceForm,
} from "../components/";
import { createProductFormInputs, productDefaultState } from "./shared";
import { useProducts, useDispatchResources } from "./hooks";

function CreateProductPage() {
  const dispatch = useDispatch();

  const { brands, colors, genres, sizes, categories } =
    useSelector(selectAllResources);

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

  useEffect(() => {}, [productState]);

  let productStateErrors = useSelector(selectProductsErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewProduct({ ...productState }));
  };
  let formInputs = createProductFormInputs({ brands, colors, genres });

  return (
    <>
      <AdminCreateHeader title="Admin Create Product" text="Create Product">
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
            <AddResourceButton text={"Add product"} />
          </div>
        </ResourceForm>
      </AdminCreateHeader>
    </>
  );
}

export default CreateProductPage;
